import { Priority, Status } from "./dto/Task";

export const DEFAULT_STATUS = "todo" as const;
export const DEFAULT_PRIORITY = "medium" as const;

export const ALLOWED_STATUSES = ["todo", "in_progress", "done"] as const;
export const ALLOWED_PRIORITIES = ["low", "medium", "high"] as const;

export const newTaskExample = {
    "title": "Перевірити безпеку застосунку",
    "description": "Провести аудит безпеки коду та налаштувань серверу",
    "status": "todo" as Status,
    "priority": "high" as Priority,
    "deadline": "2025-10-20T18:00:00Z"
}