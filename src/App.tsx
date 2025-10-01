import { useState } from "react";
import Card from "./components/card";
import Container from "./components/container";
import Navbar from "./components/navbar";
import Paginator from "./components/paginator";
import Table from "./components/table";
import mockData from "./mockData";
import ToastProvider, { useToast } from "./hooks/toast";
import Typography from "./components/typography";
import Spinner from "./components/spinner";
import Button from "./components/button";
import Input from "./components/forms/input";
import Modal from "./components/modal";
import Timeline from "./components/timeline";
import type { IconName } from "./components/icon";
import type { Colour } from "./helpers/classes";
import Toggle from "./components/forms/toggle";
import Field from "./components/field";

interface Produce {
  id: number;
  name: string;
  cost: string;
  origin: string;
  description?: string;
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
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const changePage = (count: number) => {
    const newStart = start + count;
    const newEnd = end + count;
    setFoods(mockData.foods.slice(newStart, newEnd));
    setStart(newStart);
    setEnd(newEnd);
  };

  const randomColour = () => {
    return randInArray([
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
      "slate",
      "gray",
      "zinc",
      "neutral",
      "stone",
      "black",
      "white",
      "primary",
    ]) as Colour;
  };

  const sampleText = (
    <>
      <Typography type="subtitle">It's a wonderful sauce</Typography>
      <Typography type="drop-cap" columns={2}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non
        venenatis dolor. Cras laoreet elit sit amet cursus consequat. Ut a
        dapibus libero, maximus vulputate enim. Vivamus fringilla at odio id
        bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
        at ante rhoncus, placerat velit iaculis, elementum lectus. Morbi erat
        lorem, imperdiet eget pharetra vitae, luctus nec nisl. Pellentesque arcu
        ipsum, vehicula in enim quis, rhoncus laoreet urna. Ut volutpat nibh
        metus, et dictum leo iaculis ac. Donec nec ante sapien. Maecenas massa
        lacus, vulputate at euismod non, facilisis vel massa. Sed porta metus
        non posuere accumsan. Donec sem metus, hendrerit eget pharetra nec,
        commodo non ex. Curabitur nec dolor sed turpis condimentum dapibus ac
        vehicula nisl. Nullam nec venenatis ex. Proin pulvinar diam sed augue
        pellentesque fringilla.
      </Typography>
      <Typography>
        Duis ut lacinia augue, sed ultricies nunc. Vestibulum ut enim mi.
        Phasellus ac massa ullamcorper ligula feugiat efficitur. Nulla fermentum
        sapien nisl. Sed commodo leo quis erat vulputate, sed tempor nunc
        volutpat. Mauris vitae scelerisque odio. Nunc auctor quam justo, sed
        dapibus nibh semper id. Aliquam et tellus at sapien tincidunt ultricies
        vitae nec velit. Aenean fringilla dui ut nulla fringilla, id
        pellentesque velit interdum. Proin blandit sagittis purus.
      </Typography>
      <Typography>
        Suspendisse eget ligula vel odio sagittis bibendum. Pellentesque ac quam
        tempus, iaculis nisl ac, pellentesque magna.{" "}
        <Typography underlined type="span">
          Pellentesque tincidunt tincidunt nibh, gravida semper urna imperdiet
          in.{" "}
        </Typography>
        Pellentesque commodo, metus eu dignissim dapibus, magna sapien interdum
        nibh, sit amet tincidunt orci massa eu libero. Pellentesque id tellus ut
        purus efficitur mattis tincidunt non purus. Fusce venenatis dui in
        rhoncus tempus. Mauris elit magna, ultricies et mi a, aliquet maximus
        dui.{" "}
        <Typography type="span" strike>
          Vivamus bibendum velit sit amet odio dictum, vel varius quam finibus.
        </Typography>{" "}
        In auctor, est in tincidunt lacinia, neque turpis congue ipsum, vel
        semper justo felis eget dui.
      </Typography>
      <Typography type="blockquote">
        Well, He broke the mold when He made me. He made me very special. - Mrs.
        Doubtfire
      </Typography>
      <Typography type="code">
        {`{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "isStudent": false,
  "address": {
    "street": "123 Main St",
    "zipCode": "10001"
  },
  "hobbies": ["reading", "hiking"]
}`}
      </Typography>
    </>
  );
  return (
    <div>
      <Navbar
        logoSrc="ketchup.png"
        heading="Ketchup"
        links={[
          { title: "Home", to: "", active: true },
          { title: "About", to: "" },
          { title: "Services", to: "" },
          { title: "Contact", to: "" },
        ]}
      />

      <Container>
        <Button
          onClick={() => setLoading((l) => !l)}
          text="Toggle loading"
          loading={loading}
        />
        <Modal header="Ketchup!" linkText="Open Modal" icon={{ icon: "eye" }}>
          {sampleText}
        </Modal>
        <Modal
          header="Ketchup!"
          linkText="Open Timeline"
          icon={{ icon: "timeline" }}
        >
          <Timeline
            events={mockData.foods.map((f) => ({
              icon: {
                icon: f.icon as IconName,
                iconColour: randomColour(),
              },
              title: f.name,
              subtitle: f.cost,
              body: f.description,
              tags: [
                { text: f.origin, colour: randomColour() },
                { text: f.cost, colour: randomColour() },
              ],
            }))}
          />
        </Modal>
      </Container>

      <Container>
        <Spinner loading={loading}>
          <Card padding="xl">
            <Typography type="h2">Ketchup!</Typography>
            {sampleText}
          </Card>
        </Spinner>
      </Container>

      <Container>
        <Spinner loading={loading}>
          <Card padding="lg">
            <Typography type="h2">Tables</Typography>
            <Typography type="subtitle">Time to get tabular!</Typography>
            <Paginator
              top={false}
              label="Foods"
              count={mockData.foods.length}
              start={start}
              end={end}
              onNext={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  changePage(10);
                }, 1000);
              }}
              onPrev={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  changePage(-10);
                }, 1000);
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
                expand={(val) => (
                  <>
                    <Typography type="h3">{val.name}</Typography>
                    <Field label="ID" text={val.id} />
                    <Field label="Name" text={val.name} />
                    <Field label="Cost" text={val.cost} />
                    <Field label="Origin" text={val.origin} />
                    <Field label="Description" text={val.description} />
                  </>
                )}
              />
            </Paginator>
          </Card>
        </Spinner>
      </Container>

      <Container>
        <Card padding="xl">
          <Typography type="h2">Forms</Typography>
          <Typography type="subtitle">Data collection anyone?</Typography>
          <div className="flex gap-16">
            <div className="flex-1">
              <Input
                type="text"
                state="normal"
                label="Normal"
                placeholder="Please enter a normal value"
                id="normal"
                help="Ex et tempor dolor eu duis."
              />
              <Input
                type="date"
                state="success"
                label="Success"
                placeholder="Please enter a successful value"
                id="success"
                help="Do exercitation dolor consectetur incididunt sit aute."
              />
              <Input
                type="time"
                state="error"
                label="Error"
                placeholder="Please enter a erroneous value"
                id="error"
                help="Quis fugiat qui nostrud pariatur commodo do est laboris dolore."
              />

              <Input
                type="file"
                state="normal"
                label="Normal File"
                placeholder="Please enter a normal value"
                id="normal"
                help="Ex et tempor dolor eu duis."
              />
              <Input
                type="file"
                state="success"
                label="Success File"
                placeholder="Please enter a successful value"
                id="success"
                help="Do exercitation dolor consectetur incididunt sit aute."
              />
              <Input
                type="file"
                state="error"
                label="Error File"
                placeholder="Please enter a erroneous value"
                id="error"
                help="Quis fugiat qui nostrud pariatur commodo do est laboris dolore."
              />
            </div>
            <div className="flex-1">
              <Toggle
                type="toggle"
                state="normal"
                label="Normal Toggle"
                placeholder="Please enter a normal value"
                id="normal"
                help="Commodo proident eu nisi reprehenderit ad."
              />
              <Toggle
                type="toggle"
                state="success"
                label="Success Toggle"
                placeholder="Please enter a successful value"
                id="success"
                help="Do exercitation dolor consectetur incididunt sit aute."
              />
              <Toggle
                type="toggle"
                state="error"
                label="Error Toggle"
                placeholder="Please enter a erroneous value"
                id="error"
                help="Quis fugiat qui nostrud pariatur commodo do est laboris dolore."
              />

              <Input
                type="range"
                state="normal"
                label="Normal Range"
                placeholder="Please enter a normal value"
                id="normal"
                help="Ex et tempor dolor eu duis."
              />
              <Input
                type="range"
                state="success"
                label="Success Range"
                placeholder="Please enter a successful value"
                id="success"
                help="Do exercitation dolor consectetur incididunt sit aute."
              />
              <Input
                type="range"
                state="error"
                label="Error Range"
                placeholder="Please enter a erroneous value"
                id="error"
                help="Quis fugiat qui nostrud pariatur commodo do est laboris dolore."
              />
            </div>
            <div className="flex-1">
              <Input
                type="checkbox"
                state="normal"
                label="Normal Checkbox"
                placeholder="Please enter a normal value"
                id="normal"
                help="Commodo proident eu nisi reprehenderit ad."
              />
              <Input
                type="checkbox"
                state="success"
                label="Success Checkbox"
                placeholder="Please enter a successful value"
                id="success"
                help="Do exercitation dolor consectetur incididunt sit aute."
              />
              <Input
                type="checkbox"
                state="error"
                label="Error Checkbox"
                placeholder="Please enter a erroneous value"
                id="error"
                help="Quis fugiat qui nostrud pariatur commodo do est laboris dolore."
              />
            </div>
          </div>
          <div className="text-right">
            <Button
              text="Submit"
              onClick={() => addToast("success", "Form submitted")}
            />
          </div>
        </Card>
      </Container>
    </div>
  );
}
