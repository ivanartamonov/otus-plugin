import Slider from "../src";

/* eslint no-new: off */
describe("Slider", () => {
  let markup: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = "";
    markup = document.createElement("div");
    markup.className = "yt-slider";
    markup.innerHTML = `
      <div class="yt-title">Title</div>
      <div class="yt-entries"></div>
    `;
  });

  function insertEntries(count: number) {
    const entriesWrapper = markup.querySelector(".yt-entries") as HTMLElement;
    for (let i = 1; i <= count; i += 1) {
      const entry = document.createElement("div");
      entry.className = "yt-entry";
      entry.innerHTML = `Some Content ${i}`;
      entriesWrapper.append(entry);
    }
  }

  it("init OK", () => {
    insertEntries(5);
    new Slider(markup, { visible: 2 });

    expect(markup.querySelector(".yt-arrow-down")).toBeTruthy();
    expect(markup.querySelectorAll(".yt-entries > .yt-entry").length).toBe(2);
    expect(
      markup.querySelectorAll(".yt-entries > div > .yt-entry").length
    ).toBe(3);
  });

  it("Empty config", () => {
    insertEntries(5);
    new Slider(markup);

    expect(markup.querySelector(".yt-arrow-down")).toBeTruthy();
    expect(markup.querySelectorAll(".yt-entries > .yt-entry").length).toBe(3);
    expect(
      markup.querySelectorAll(".yt-entries > div > .yt-entry").length
    ).toBe(2);
  });

  it("Init by string selector", () => {
    insertEntries(5);
    document.body.append(markup);
    new Slider(".yt-slider");

    expect(markup.querySelector(".yt-arrow-down")).toBeTruthy();
    expect(markup.querySelectorAll(".yt-entries > .yt-entry").length).toBe(3);
    expect(
      markup.querySelectorAll(".yt-entries > div > .yt-entry").length
    ).toBe(2);
  });

  it("Wrong selector", () => {
    insertEntries(5);
    document.body.append(markup);

    expect(() => {
      new Slider(".wrong_selector");
    }).toThrow(new Error("Selector .wrong_selector not found"));
    expect(markup.querySelector(".yt-arrow-down")).toBeFalsy();
    expect(markup.querySelectorAll(".yt-entries > .yt-entry").length).toBe(5);
    expect(
      markup.querySelectorAll(".yt-entries > div > .yt-entry").length
    ).toBe(0);
  });

  it("Wrong wrapper", () => {
    insertEntries(5);

    const wrapper = markup.querySelector(".yt-entries") as HTMLElement;
    wrapper.className = "wrongClass";

    expect(() => {
      new Slider(markup);
    }).not.toThrow();
    expect(markup.querySelector(".yt-arrow-down")).toBeFalsy();
    expect(markup.querySelectorAll(".wrongClass > .yt-entry").length).toBe(5);
  });

  it("Slide down after click", () => {
    insertEntries(5);

    expect(() => {
      new Slider(markup, { visible: 2 });
    }).not.toThrow();
    expect(markup.querySelector(".yt-arrow-down")).toBeTruthy();
    expect(markup.querySelectorAll(".yt-entries > .yt-entry").length).toBe(2);
    expect(
      markup.querySelectorAll(".yt-entries > div > .yt-entry").length
    ).toBe(3);

    const arrow = markup.querySelector(".yt-arrow-down") as HTMLElement;
    arrow.click();

    expect(markup.querySelector(".yt-arrow-down")).toBeFalsy();
  });
});
