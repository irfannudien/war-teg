import { Card, CardHeader, CardBody } from "@heroui/react";

const CardContainer = ({ title, children }) => {
  return (
    <div className="min-h-screen w-[300px] flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg px-2">
        <CardHeader className="text-xl font-semibold text-center flex justify-center">
          {title}
        </CardHeader>
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  );
};

export default CardContainer;
