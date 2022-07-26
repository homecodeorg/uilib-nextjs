import type { NextPage } from "next";
import {
  Button,
  VH,
  Theme,
  ThemeHelpers,
  AssistiveText,
  ButtonGroup,
  Checkbox,
  Input,
  InputFile,
  Select,
  Popup,
  Spinner,
  Icon,
  DateTime,
  Scroll,
  VirtualizedListScroll,
  array,
  Notifications,
  NotificationsStore,
  Container,
  Router,
  Link,
} from "@foreverido/uilib";
import "moment/locale/ru"; // required for <DateTime locale="ru">
import Time from "timen";
import { createStore, withStore } from "justorm/react";

import styles from "../styles/Home.module.css";
import { useCallback, useEffect } from "react";

// ---------- Theme
const { colorsConfigToVars } = ThemeHelpers;
const colorsAlphaModes = [0, 50, 100, 200, 500, 800, 900];
const darkColor = ["#171717", { alpha: colorsAlphaModes }];
const lightColor = ["#e6e6e6", { alpha: colorsAlphaModes }];

export const colors = {
  active: [
    "#c0990c",
    { alpha: [100, 300, 500, 800] /* mix: [['accent', 300]] */ },
  ],
  warning: ["#ffa31a", { alpha: [100, 200, 500] }],
  danger: ["#da3749", { alpha: [100, 300, 500] }],
  disable: "#f1f1f2",
  link: "#3089fe",
  accent: lightColor,
  decent: darkColor,
};
const defaultConfig = {
  "indent-s": "10px",
  "indent-m": "20px",
  "indent-l": "30px",
  "border-radius-s": "2px",
  "border-radius-m": "4px",
  "border-radius-l": "6px",
};
const themeConfig = {
  ...colorsConfigToVars(colors),
  ...defaultConfig,
};
// ---------- Theme

// ---------- Select
const OPTIONS = [
  { id: 0, label: "Vitae" },
  { id: 1, label: "Viverra" },
  { id: 2, label: "Viverra" },
  { id: 3, label: "Odio" },
  { id: 4, label: "Viverra" },
  { id: 5, label: "Sed" },
  { id: 6, label: "Aenean" },
  { id: 7, label: "Aenean" },
  { id: 8, label: "Ante" },
  { id: 9, label: "Mauris" },
  { id: 10, label: "Ante" },
  { id: 11, label: "Ante" },
  { id: 12, label: "Odio" },
  { id: 13, label: "Vitae" },
  { id: 14, label: "Cursus" },
];
// ---------- Select

// ---------- Virtualized
const PAGE_SIZE = 20;
const totalCount = 10;
const store = createStore("example", { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });
export function loadData(first, last, getItemData, delay = 200) {
  const data = [];

  return new Promise((resolve) => {
    for (let i = first; i < last; i++) {
      data.push(getItemData(i));
    }

    Time.after(delay, () => resolve(data));
  });
}
function getSimpleItemData(i) {
  return `Item ${i + 1}`;
}
function renderSimpleItems(props, data) {
  if (!data) return null;
  return <div {...props}>{data}</div>;
}
const loadNextData = (first, last) =>
  loadData(first, last, getSimpleItemData, 1000);
function setData(nextData, startIndex = store.data.length) {
  store.data = array.insert(store.data, nextData, startIndex);
}
// ---------- Virtualized

// ---------- Notifications
const params = {
  info: {
    title: "Information",
    content: "This is informative type of notification.",
  },
  warning: {
    type: "warning",
    title: "Warning",
    content: "Connection lost.",
  },
  error: {
    type: "danger",
    title: "Error",
    content: "Server are down. Need your support ASAP.",
  },
  loading: {
    autohide: false,
    title: "Loading...",
    content: "This notification stay visible until you close it.",
  },
};

const show = (type) => NotificationsStore.show(params[type]);
const showAll = () => {
  let delay = 0;
  ["info", "warning", "error", "loading"].forEach((type) =>
    Time.after((delay += Math.random() * 1000), () => show(type))
  );
};
// ---------- Notifications

// ---------- Router
const StartPage = () => (
  <>
    <Link href="/">Home</Link>
    <Link href="/users">Users</Link>
  </>
);
const UsersPage = () => (
  <>
    <Link href="/">Home</Link>
    <Link href="/users">Users</Link>
    <br />
    <Link href="/users/azaza">azaza</Link>
    <Link href="/users/ololosh">ololosh</Link>
  </>
);
const UserPage = ({ id, rootPath }) => {
  const currPage = `/users/${id}`;

  return (
    <>
      <Link href="/">Home</Link>
      <Link href="/users">Users</Link>
      <Link href={currPage}>{id}</Link>
      <br />
      <Router rootPath={`${rootPath}${currPage}`}>
        <UserMenu id={id} />
        <UserFriends path="/friends" />
        <UserCreatures path="/creatures" />
      </Router>
    </>
  );
};
const UserMenu = ({ id }) => (
  <>
    <Link href="/friends">friends</Link>
    <Link href="/creatures">creatures</Link>
  </>
);
const UserFriends = () => "friends: foo, bar";
const UserCreatures = () => "creatures: sas";
const rootPath = "/Router";
// ---------- Router

// ---------- DateTime
const date = new Date("11.08.2020");
// ---------- DateTime

const Home: NextPage = ({ store: { router, example } }) => {
  const { data } = example.originalObject;
  const itemsCount = data.length;

  useEffect(() => {
    loadNextData(0, PAGE_SIZE).then(setData);
  }, []);

  const onScrollEnd = useCallback(() => {
    const count = store.data.length;
    loadNextData(count, count + PAGE_SIZE).then(setData);
  }, []);

  return (
    <div className={styles.container}>
      <VH />
      <Theme config={themeConfig} />
      <ButtonGroup>
        <Button>asdasdasd</Button>
        <Button>1231231</Button>
      </ButtonGroup>
      <AssistiveText>123123123</AssistiveText>
      <Checkbox label="123123123" onChange={() => {}} checked size="m" />
      <Input
        type="textarea"
        label="Textarea example label"
        value="123123"
        // onChange={(e, val) => setValue(val)}
        hasClear
        size="m"
      />
      <InputFile
        size="m"
        label="Photo"
        value={""}
        // onChange={(e, val) => setValue(val)}
        upload={() => {}}
        accept="image/png, image/jpeg"
      />
      <Popup
        //isOpen
        // controllable
        direction="bottom"
        trigger={<Button>Open Popup</Button>}
        content={<div style={{ padding: 10 }}>Popup content</div>}
      />
      <Select
        isSearchable
        label="Label"
        options={OPTIONS}
        value={0}
        // onChange={val => setValue(val)}
      />
      <Spinner />
      <Icon type="check" size="m" />
      <DateTime value={date} format="DD.MM.YYYY" format="toNow" locale="ru" />
      <Scroll
        x
        y
        style={{
          height: 200,
          width: 200,
          color: `var(--accent-color-alpha-100)`,
        }}
        offset={{
          x: { after: 20 },
          y: { before: 50, after: 20 },
        }}
      >
        <div style={{ width: 1000 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is
          simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has
          survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </div>
      </Scroll>
      <div style={{ height: 200, width: 400 }}>
        <VirtualizedListScroll
          scrollProps={{ y: true }}
          totalCount={totalCount}
          itemsCount={itemsCount}
          overlapCount={10}
          itemHeight={40}
          renderItem={(itemProps) =>
            renderSimpleItems(itemProps, data[itemProps.key])
          }
          onScrollEnd={() => onScrollEnd()}
          contentAfter={
            itemsCount !== totalCount && (
              <>
                <Spinner size="s" style={{ marginRight: 10 }} />
                loading items...
              </>
            )
          }
          pageSize={PAGE_SIZE}
        />
      </div>

      <Container fullHeight>
        <Notifications style={{ maxWidth: "60%" }} />
        <div>
          <Button onClick={() => show("info")}>Info</Button>
          <br />
          <Button onClick={() => show("warning")}>Warning</Button>
          <br />
          <Button onClick={() => show("error")}>Error</Button>
          <br />
          <Button onClick={() => show("loading")}>Loading</Button>
          <br />
          <Button onClick={showAll}>All</Button>
        </div>
      </Container>

      <>
        {/* {router.path?.replace(new RegExp(`^${rootPath}`), "") || "/"} */}
        <br />
        <Router rootPath={rootPath}>
          <StartPage />
          <UsersPage path="/users" />
          <UserPage exact path="/users/:id" rootPath={rootPath} />
        </Router>
      </>
    </div>
  );
};

export default withStore(["example", "router"])(Home);
