import { Card, CardBody, Spinner } from "@nextui-org/react";
import { lazy, Suspense } from "react";
const TaskManagement = lazy(() => import("../../../TaskManagement/TaskManagemnt"));

const TasksTab = ({ collaboration, currentUser }) => (
  <Card className="shadow-md">
    <CardBody>
      <Suspense fallback={<Spinner size="lg" label="Loading Tasks..." />}>
        <TaskManagement context="collaboration" currentUser={currentUser} contextData={collaboration} />
      </Suspense>
    </CardBody>
  </Card>
);

export default TasksTab;