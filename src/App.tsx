import { useState } from "react";
import Card from "./components/card";
import Container from "./components/container";
import Navbar from "./components/navbar";
import Paginator from "./components/paginator";
import Table from "./components/table";
import mockData from "./mockData";
import ToastProvider, { useToast } from "./hooks/toast";
import Typography from "./components/typography";

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

function randInArray<T>(arr: T[]): T {
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
                  val.name,
                );
              }}
            />
          </Paginator>
        </Card>
      </Container>

      <Container>
        <Card>
          <Typography type="h2">Ketchup!</Typography>
          <Typography type="subtitle">It's a wonderful sauce</Typography>
          <Typography type="drop-cap" columns={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non
            venenatis dolor. Cras laoreet elit sit amet cursus consequat. Ut a
            dapibus libero, maximus vulputate enim. Vivamus fringilla at odio id
            bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Etiam at ante rhoncus, placerat velit iaculis, elementum lectus.
            Morbi erat lorem, imperdiet eget pharetra vitae, luctus nec nisl.
            Pellentesque arcu ipsum, vehicula in enim quis, rhoncus laoreet
            urna. Ut volutpat nibh metus, et dictum leo iaculis ac. Donec nec
            ante sapien. Maecenas massa lacus, vulputate at euismod non,
            facilisis vel massa. Sed porta metus non posuere accumsan. Donec sem
            metus, hendrerit eget pharetra nec, commodo non ex. Curabitur nec
            dolor sed turpis condimentum dapibus ac vehicula nisl. Nullam nec
            venenatis ex. Proin pulvinar diam sed augue pellentesque fringilla.
            <Typography>
              Duis ut lacinia augue, sed ultricies nunc. Vestibulum ut enim mi.
              Phasellus ac massa ullamcorper ligula feugiat efficitur. Nulla
              fermentum sapien nisl. Sed commodo leo quis erat vulputate, sed
              tempor nunc volutpat. Mauris vitae scelerisque odio. Nunc auctor
              quam justo, sed dapibus nibh semper id. Aliquam et tellus at
              sapien tincidunt ultricies vitae nec velit. Aenean fringilla dui
              ut nulla fringilla, id pellentesque velit interdum. Proin blandit
              sagittis purus.
            </Typography>
            <Typography>
              Suspendisse eget ligula vel odio sagittis bibendum. Pellentesque
              ac quam tempus, iaculis nisl ac, pellentesque magna.{" "}
              <Typography underlined type="span">
                Pellentesque tincidunt tincidunt nibh, gravida semper urna
                imperdiet in.{" "}
              </Typography>
              Pellentesque commodo, metus eu dignissim dapibus, magna sapien
              interdum nibh, sit amet tincidunt orci massa eu libero.
              Pellentesque id tellus ut purus efficitur mattis tincidunt non
              purus. Fusce venenatis dui in rhoncus tempus. Mauris elit magna,
              ultricies et mi a, aliquet maximus dui.{" "}
              <Typography type="span" strike>
                Vivamus bibendum velit sit amet odio dictum, vel varius quam
                finibus.
              </Typography>{" "}
              In auctor, est in tincidunt lacinia, neque turpis congue ipsum,
              vel semper justo felis eget dui.
            </Typography>
          </Typography>
          <Typography type="blockquote">
            Well, He broke the mold when He made me. He made me very special. -
            Mrs. Doubtfire
          </Typography>
        </Card>
      </Container>
    </div>
  );
}
