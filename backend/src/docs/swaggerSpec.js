const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Task Management API",
    version: "1.0.0",
    description:
      "REST API for a task management application with JWT authentication, task CRUD, filtering, pagination, and admin support.",
  },
  servers: [
    {
      url: "http://localhost:5000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      AuthInput: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
        },
      },
      SignupInput: {
        allOf: [
          { $ref: "#/components/schemas/AuthInput" },
          {
            type: "object",
            required: ["name"],
            properties: {
              name: { type: "string" },
              inviteCode: { type: "string" },
            },
          },
        ],
      },
      User: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          role: { type: "string", enum: ["user", "admin"] },
        },
      },
      Task: {
        type: "object",
        properties: {
          _id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          status: { type: "string", enum: ["pending", "completed"] },
          priority: { type: "string", enum: ["low", "medium", "high"] },
          dueDate: { type: "string", format: "date-time", nullable: true },
          tags: {
            type: "array",
            items: { type: "string" },
          },
          user: { $ref: "#/components/schemas/User" },
        },
      },
      TaskInput: {
        type: "object",
        required: ["title"],
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          status: { type: "string", enum: ["pending", "completed"] },
          priority: { type: "string", enum: ["low", "medium", "high"] },
          dueDate: { type: "string", format: "date-time" },
          tags: {
            type: "array",
            items: { type: "string" },
          },
        },
      },
    },
  },
  paths: {
    "/api/health": {
      get: {
        summary: "Health check",
        responses: {
          200: {
            description: "Service is healthy",
          },
        },
      },
    },
    "/api/auth/signup": {
      post: {
        summary: "Register a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SignupInput" },
            },
          },
        },
        responses: {
          201: {
            description: "User created",
          },
        },
      },
    },
    "/api/auth/login": {
      post: {
        summary: "Login a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthInput" },
            },
          },
        },
        responses: {
          200: {
            description: "Authenticated successfully",
          },
        },
      },
    },
    "/api/auth/me": {
      get: {
        summary: "Get current user",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Current user returned",
          },
        },
      },
    },
    "/api/tasks": {
      get: {
        summary: "List tasks with filters and pagination",
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: "query", name: "status", schema: { type: "string" } },
          { in: "query", name: "priority", schema: { type: "string" } },
          { in: "query", name: "search", schema: { type: "string" } },
          { in: "query", name: "page", schema: { type: "integer" } },
          { in: "query", name: "limit", schema: { type: "integer" } },
          { in: "query", name: "scope", schema: { type: "string" } },
          { in: "query", name: "sortBy", schema: { type: "string" } },
          { in: "query", name: "order", schema: { type: "string" } },
        ],
        responses: {
          200: {
            description: "Paginated task list",
          },
        },
      },
      post: {
        summary: "Create a task",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TaskInput" },
            },
          },
        },
        responses: {
          201: {
            description: "Task created",
          },
        },
      },
    },
    "/api/tasks/{id}": {
      get: {
        summary: "Get a single task",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Task returned",
          },
        },
      },
      patch: {
        summary: "Update a task",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TaskInput" },
            },
          },
        },
        responses: {
          200: {
            description: "Task updated",
          },
        },
      },
      delete: {
        summary: "Delete a task",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Task deleted",
          },
        },
      },
    },
    "/api/tasks/{id}/status": {
      patch: {
        summary: "Toggle task status",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Task status toggled",
          },
        },
      },
    },
    "/api/users": {
      get: {
        summary: "List users for admin",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Users returned",
          },
        },
      },
    },
    "/api/users/overview": {
      get: {
        summary: "Admin dashboard overview",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Overview returned",
          },
        },
      },
    },
  },
};

module.exports = swaggerSpec;
