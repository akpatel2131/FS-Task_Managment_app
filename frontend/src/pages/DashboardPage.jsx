import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createTask,
  deleteTask,
  fetchAdminOverview,
  fetchTasks,
  toggleTaskStatus,
  updateTask,
} from "../api/tasks";
import Pagination from "../components/Pagination";
import StatsGrid from "../components/StatsGrid";
import TaskFilters from "../components/TaskFilters";
import TaskFormModal from "../components/TaskFormModal";
import TaskList from "../components/TaskList";
import ThemeToggle from "../components/ThemeToggle";
import useAuth from "../hooks/useAuth";
import AppShell from "../layouts/AppShell";
import styles from "./DashboardPage.module.css";

const defaultFilters = {
  search: "",
  status: "all",
  priority: "all",
  sortBy: "createdAt",
  order: "desc",
  page: 1,
  limit: 6,
  scope: "mine",
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [filters, setFilters] = useState(defaultFilters);
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [stats, setStats] = useState({ all: 0, completed: 0, pending: 0 });
  const [adminOverview, setAdminOverview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const deferredSearch = useDeferredValue(filters.search);

  const applyTaskResponse = (response) => {
    startTransition(() => {
      setTasks(response.tasks);
      setPagination(response.pagination);
      setStats(response.stats);
    });
  };

  const handleUnauthorized = () => {
    logout();
    navigate("/login");
  };

  const refreshTasks = async (overrides = {}) => {
    const response = await fetchTasks({
      ...filters,
      ...overrides,
      search:
        typeof overrides.search !== "undefined" ? overrides.search : deferredSearch,
    });

    applyTaskResponse(response);
    return response;
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        await refreshTasks();
      } catch (error) {
        if (error.status === 401) {
          handleUnauthorized();
          return;
        }

        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [deferredSearch, filters.status, filters.priority, filters.sortBy, filters.order, filters.page, filters.limit, filters.scope, logout, navigate]);

  useEffect(() => {
    const loadAdminOverview = async () => {
      if (user?.role !== "admin") {
        setAdminOverview(null);
        return;
      }

      try {
        const response = await fetchAdminOverview();
        setAdminOverview(response.overview);
      } catch (error) {
        setAdminOverview(null);
      }
    };

    loadAdminOverview();
  }, [user?.role]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
      page: 1,
    }));
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
  };

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (payload) => {
    try {
      setIsSaving(true);

      if (editingTask) {
        await updateTask(editingTask._id, payload);
      } else {
        await createTask(payload);
      }

      setIsModalOpen(false);
      setEditingTask(null);
      setFilters((currentFilters) => ({ ...currentFilters, page: 1 }));
      await refreshTasks({ page: 1 });
    } catch (error) {
      if (error.status === 401) {
        handleUnauthorized();
        return;
      }

      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (taskId) => {
    try {
      setActiveTaskId(taskId);
      await toggleTaskStatus(taskId);
      await refreshTasks();
    } catch (error) {
      if (error.status === 401) {
        handleUnauthorized();
        return;
      }

      setErrorMessage(error.message);
    } finally {
      setActiveTaskId("");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      setActiveTaskId(taskId);
      await deleteTask(taskId);
      const nextPage =
        tasks.length === 1 && pagination?.page > 1 ? pagination.page - 1 : filters.page;

      setFilters((currentFilters) => ({ ...currentFilters, page: nextPage }));
      await refreshTasks({ page: nextPage });
    } catch (error) {
      if (error.status === 401) {
        handleUnauthorized();
        return;
      }

      setErrorMessage(error.message);
    } finally {
      setActiveTaskId("");
    }
  };

  const handlePageChange = (page) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      page,
    }));
  };

  const header = (
    <>
      <div>
        <span className={styles.dashboardHeaderEyebrow}>Dashboard</span>
        <h2>{user?.role === "admin" ? "Workspace command center" : "Your task flow"}</h2>
      </div>
      <div className={styles.headerActions}>
        <ThemeToggle />
        <div className={styles.profileMenu} tabIndex="0">
          <button className={styles.profileTrigger} type="button" aria-label="Open profile menu">
            {(user?.name || user?.email || "U").slice(0, 1).toUpperCase()}
          </button>
          <div className={styles.profilePopup}>
            <span className={styles.profilePopupLabel}>Signed in as</span>
            <strong>{user?.name}</strong>
            <p>{user?.email}</p>
            <span className={styles.roleBadge}>Role: {user?.role}</span>
            <button
              className={`${styles.button} ${styles.buttonGhost} ${styles.buttonFull}`}
              onClick={() => {
                logout();
                navigate("/login");
              }}
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <AppShell header={header}>
        <StatsGrid stats={stats} adminOverview={adminOverview} />

        {errorMessage && (
          <div className={`${styles.formAlert} ${styles.formAlertWide}`}>{errorMessage}</div>
        )}

        <TaskFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          onCreateTask={handleOpenCreate}
          isAdmin={user?.role === "admin"}
        />

        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          activeTaskId={activeTaskId}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggle={handleToggleStatus}
        />

        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </AppShell>

      <TaskFormModal
        isOpen={isModalOpen}
        task={editingTask}
        isSubmitting={isSaving}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
      />
    </>
  );
};

export default DashboardPage;
