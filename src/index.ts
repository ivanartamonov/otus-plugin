const root = document.getElementById("root") as HTMLElement;
root.innerHTML = "<h1>Hello, world</h1>";

export default function say(text: string) {
  return "Hello, " + text + "!";
}
