# Voding.dev Product Requirements Document

Version: 1.0  
Date: May 29, 2025  
Author: Product Team

## Overview
Voding.dev is a unified web platform that combines project management, team collaboration, CRM, and idea tracking into a cohesive SaaS application.

## Core Modules

### 1. Project & Task Management
- Project dashboard with active, upcoming, and archived projects
- Kanban-style task boards with drag-and-drop functionality
- Detailed task management with dependencies and sub-tasks
- Timeline view with Gantt chart capabilities

### 2. Team Management
- Organization structure with teams and sub-teams
- Role-based access control (RBAC)
- User invitations and onboarding workflow
- Activity feed for transparency

### 3. CRM (Admin Only)
- Lead and contact management
- Sales pipeline with customizable stages
- Activity logging and follow-ups
- Performance reporting and metrics

### 4. IdeaBank
- Idea submission and upvoting system
- Threaded discussions
- Automated project conversion based on thresholds
- Weekly idea digests for admins

## User Roles

### Super Admin (Ian)
- Full platform access
- Organization settings
- User management
- Data exports

### Admin (Ysl Ron)
- Project/task management
- Team management
- CRM access
- IdeaBank configuration

### Lead Contributor (Alexis)
- Project/task management
- IdeaBank moderation
- No CRM/admin access

### Team Leads (Dreb, Ralf)
- Team-specific management
- Work assignment
- Progress review
- No admin access

### Team Members (Kobe, Reuben)
- Task updates
- IdeaBank participation
- Limited module access

## Teams Structure

### Marketing & Production
- Members: Ian, Ysl, Alexis, Reuben, Ralf
- Focus: Campaign ideation, creative assets, copy

### Lead Creative & Marketing
- Members: Ian (Lead), Ysl, Alexis
- Focus: Strategy, direction, KPIs

### Frontend Team
- Members: Ysl (Lead), Ralf, Reuben
- Backups: Alexis, Ysl
- Focus: UI/UX implementation

### Backend Team
- Members: Dreb (Lead), Kobe
- Focus: API, infrastructure

### Full-Stack Team
- Members: Dreb, Kobe, Reuben, Ralf
- Focus: End-to-end delivery

## Success Metrics
- User Engagement (DAU/WAU/MAU)
- Idea → Project Conversion Rate (50% increase goal)
- Lead Response Time
- Task Completion Rate
- Sales Cycle Length (20% reduction goal)

## Technical Requirements
- Next.js frontend
- Role-based authentication
- Responsive design
- WCAG 2.1 AA compliance