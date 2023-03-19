import { AppComponent } from './app.component';
import { v4 as uuidv4 } from 'uuid';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    component = new AppComponent();
  });

  describe('addTask', () => {
    it('should add a task to the tasks array', () => {
      const taskDescription = 'New Task';
      component.newTask = taskDescription;

      component.addTask();

      expect(component.tasks.length).toBe(1);
      expect(component.tasks[0].description).toBe(taskDescription);
    });

    it('should not add a task if the description is empty', () => {
      component.newTask = '';

      component.addTask();

      expect(component.tasks.length).toBe(0);
    });

    it('should not add a task if the tasks array is already at maximum length', () => {
      component.tasksMaxLength = 1;
      component.newTask = 'New Task';
      component.tasks.push({ id: uuidv4(), description: 'Existing Task', completed: false });

      component.addTask();

      expect(component.tasks.length).toBe(1);
    });
  });

  describe('removeTask', () => {
    beforeEach(() => {
      const task1 = { id: uuidv4(), description: 'Task 1', completed: false };
      const task2 = { id: uuidv4(), description: 'Task 2', completed: false };
      component.tasks = [task1, task2];
    });

    it('should remove the task at the specified index', () => {
      const indexToRemove = 1;

      component.removeTask(indexToRemove);

      expect(component.tasks.length).toBe(1);
      expect(component.tasks[0].description).toBe('Task 1');
    });

    it('should not remove any tasks if the index is out of range', () => {
      const invalidIndex = 5;

      component.removeTask(invalidIndex);

      expect(component.tasks.length).toBe(2);
    });
  });
});