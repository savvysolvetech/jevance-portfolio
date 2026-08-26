import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CVProvider } from './context/CVContext';
import { ToastContainer } from './components/ui/ToastContainer';

// Public Views
import { PublicHomePage } from './components/public/PublicHomePage';
import { DownloadCVView } from './components/public/DownloadCVView';

// Admin Views
import { AdminLoginPage } from './components/admin/AdminLoginPage';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminSummaryPage } from './components/admin/AdminSummaryPage';
import { AdminExperiencePage } from './components/admin/AdminExperiencePage';
import { AdminEducationPage } from './components/admin/AdminEducationPage';
import { AdminSkillsPage } from './components/admin/AdminSkillsPage';
import { AdminProjectsPage } from './components/admin/AdminProjectsPage';
import { AdminCertificationsPage } from './components/admin/AdminCertificationsPage';
import { AdminAchievementsPage } from './components/admin/AdminAchievementsPage';
import { AdminRefereesPage } from './components/admin/AdminRefereesPage';
import { AdminResumePage } from './components/admin/AdminResumePage';
import { AdminSettingsPage } from './components/admin/AdminSettingsPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CVProvider>
          <BrowserRouter>
            <ToastContainer />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicHomePage />} />
              <Route path="/download-cv" element={<DownloadCVView />} />

              {/* Admin Auth Route */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

              {/* Admin Protected Dashboard Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminLayout activeSection="dashboard">
                      <AdminDashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/summary"
                element={
                  <ProtectedRoute>
                    <AdminLayout activeSection="summary">
                      <AdminSummaryPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/experience"
                element={
                  <ProtectedRoute>
                    <AdminLayout activeSection="experience">
                      <AdminExperiencePage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/education"
                element={
                  <ProtectedRoute>
                    <AdminLayout activeSection="education">
                      <AdminEducationPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/skills"
                element={
                  <ProtectedRoute>
                    <AdminLayout activeSection="skills">
                      <AdminSkillsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects"
                element={
                  <ProtectedRoute>
                    <AdminLayout activeSection="projects">
                      <AdminProjectsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/certifications"
                element={
                  <ProtectedRoute>
                    <AdminLayout activeSection="certifications">
                      <AdminCertificationsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/achievements"
                element={
                  <ProtectedRoute>
                    <AdminLayout activeSection="achievements">
                      <AdminAchievementsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/referees"
                element={
                  <ProtectedRoute>
                    <AdminLayout activeSection="referees">
                      <AdminRefereesPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/resume"
                element={
                  <ProtectedRoute>
                    <AdminLayout activeSection="resume">
                      <AdminResumePage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute>
                    <AdminLayout activeSection="settings">
                      <AdminSettingsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </CVProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
