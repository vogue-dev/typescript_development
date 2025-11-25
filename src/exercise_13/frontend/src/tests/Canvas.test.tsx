import { render } from "@testing-library/react";
import { Canvas } from "../features/tasks/components/Canvas";

// Mock API
vi.mock("../api", () => ({
    fetchTasks: () => Promise.resolve([]),
    updateTaskStatus: () => Promise.resolve()
}));

describe("Canvas smoke test", () => {
    test("renders without crashing", () => {
        render(<Canvas />);
    });
});
