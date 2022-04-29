import "./slider.css";

interface Config {
  visible: number;
}

class Slider {
  private config: Config;
  private root: NodeListOf<HTMLElement>;
  private entryWrapper = ".yt-entries";
  private entryClass = ".yt-entry";

  constructor(selector: string, config?: Config) {
    if (config === undefined) {
      this.config = {
        visible: 3,
      };
    } else {
      this.config = config;
    }

    this.root = document.querySelectorAll(selector);
    if (this.root.length === 0) {
      throw new Error(`Selector ${selector} not found`);
    }

    this.root.forEach((el) => {
      this.initSlider(el);
    });
  }

  private initSlider(el: HTMLElement) {
    const wrapper: HTMLElement | null = el.querySelector(this.entryWrapper);
    if (wrapper === null) {
      return;
    }

    const entries: NodeListOf<HTMLElement> = wrapper.querySelectorAll(
      this.entryClass
    );
    const hidden = document.createElement("div");

    entries.forEach((item, index) => {
      if (index >= this.config.visible) {
        hidden.append(item);
      }
    });

    hidden.setAttribute("data-height", String(hidden.offsetHeight));
    hidden.style.height = "0px";
    hidden.style.maxHeight = "0px";
    hidden.style.transition = "max-height 0.5s ease-in-out";
    hidden.style.overflow = "hidden";
    wrapper.append(hidden);

    const arrow = document.createElement("div");
    arrow.addEventListener("click", this.onShow);
    arrow.className = "yt-arrow-down";
    arrow.innerHTML = "<div></div>";
    wrapper.append(arrow);
  }

  onShow(e: Event) {
    const arrow = <HTMLElement>e.currentTarget;
    const hidden = <HTMLElement>arrow.previousSibling;

    hidden.style.height = `auto`;
    hidden.style.maxHeight = `1000px`;

    arrow.remove();
  }
}

export default Slider;
