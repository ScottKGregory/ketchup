import { useState } from "react";
import Card from "./components/card";
import Container from "./components/container";
import Navbar from "./components/navbar";
import Paginator from "./components/paginator";
import Table from "./components/table";
import mockData from "./mockData";
import ToastProvider, { useToast } from "./hooks/toast";

interface Produce {
  id: number;
  name: string;
  cost: string;
  origin: string;
}

export default function App() {
  return (
    <ToastProvider>
      <Content />
    </ToastProvider>
  );
}

function randInArray<T extends any>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function Content() {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [foods, setFoods] = useState(mockData.foods.slice(start, end));

  const { addToast } = useToast();

  const changePage = (count: number) => {
    const newStart = start + count;
    const newEnd = end + count;
    setFoods(mockData.foods.slice(newStart, newEnd));
    setStart(newStart);
    setEnd(newEnd);
  };

  return (
    <div>
      <Navbar
        links={[
          { title: "Home", to: "", active: true },
          { title: "About", to: "" },
          { title: "Services", to: "" },
          { title: "Contact", to: "" },
        ]}
      />

      <Container>
        <Card>
          <Paginator
            top={false}
            label="Foods"
            count={mockData.foods.length}
            start={start}
            end={end}
            onNext={() => {
              changePage(10);
            }}
            onPrev={() => {
              changePage(-10);
            }}
          >
            <Table<Produce>
              data={foods}
              columns={[
                { heading: "ID", key: "id" },
                { heading: "Name", key: "name" },
                { heading: "Cost", key: "cost", align: "right" },
                { heading: "Origin", key: "origin" },
              ]}
              onRowClick={(val: Produce) => {
                addToast(
                  randInArray(["info", "success", "warning", "error"]),
                  val.name
                );
              }}
            />
          </Paginator>
        </Card>
      </Container>
    </div>
  );
}
