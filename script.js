const input = document.getElementById("input");
const prev_cmds = document.getElementsByClassName("previous-cmds")[0];
const cmd_cwd = document.getElementsByClassName("cwd")[0];
const cont = document.getElementsByClassName("scroll")[0];

const cwd = [];

const directories = [
  { name: "Desktop", type: "folder" },
  { name: "Documents", type: "folder" },
  { name: "Pictures", type: "folder" },
  { name: "Audio", type: "folder" },
  { name: "Videos", type: "folder" },
  { name: "file.js", type: "file" },
];

const availableCommands = ["ls", "echo", "touch", "mkdir", "cd", "clear"];

input.addEventListener("keydown", updateValue);

input.addEventListener("input", checkIdentified);

function updateValue(e) {
  if (e.key === "Enter") {
    commander(e.target.value.toLowerCase());
  }
  input.style.width = `${e.target.value.length * 20}px`;
}

function checkIdentified(e) {
  if (availableCommands.includes(e.target.value.toLowerCase())) {
    input.classList.add("cmd-identified");
  } else {
    input.classList.remove("cmd-identified");
  }
}

function commander(command) {
  let [cmd, post] = command.split(" ");
  switch (cmd) {
    case "help":
      entered(command);
      const helpDiv = document.createElement("div");
      helpDiv.classList.add("help-flex");
      for (var i = 0; i < availableCommands.length; i++) {
        const textnode = document.createTextNode(availableCommands[i]);
        const para = document.createElement("p");
        para.appendChild(textnode);
        para.classList.add("help-p");
        helpDiv.appendChild(para);
        prev_cmds.appendChild(helpDiv);
      }
      break;

    case "ls":
      entered(command);
      const lsDiv = document.createElement("div");
      lsDiv.classList.add("ls-flex");

      for (var i = 0; i < directories.length; i++) {
        let slash = "";
        if (directories[i].type === "folder") {
          slash = "/";
        }
        const textnode = document.createTextNode(
          `${slash}${directories[i].name}`
        );
        const para = document.createElement("p");
        if (directories[i].type === "folder") {
          para.classList.add("ls-folder");
        } else {
          para.classList.add("ls-file");
        }
        para.appendChild(textnode);
        lsDiv.appendChild(para);
        prev_cmds.appendChild(lsDiv);
      }
      break;
    case "echo":
      entered(command);
      const echo_text = document.createTextNode(post);
      const echo = document.createElement("p");
      echo.appendChild(echo_text);
      prev_cmds.appendChild(echo);
      break;

    case "clear":
      entered(command);
      prev_cmds.innerHTML = "";
      break;

    case "touch":
      entered(command);
      directories.push({
        type: "file",
        name: post,
      });
      break;

    case "mkdir":
      entered(command);
      directories.push({
        type: "folder",
        name: `${post}`,
      });
      break;

    case "cd":
      entered(command);
      if (post === "..") {
        cwd.pop();
      } else {
        cwd.push(post);
      }
      cmd_cwd.innerHTML = cwd.join("/");
      break;

    default:
      let e = `bash: ${command} command is not found `;
      entered(e);
  }
}

function entered(command) {
  const prefix_text = document.createTextNode(`kareem@dev:~ `);
  const prefix = document.createElement("p");
  prefix.appendChild(prefix_text);
  prefix.style.marginRight = "10px";
  prefix.style.color = "greenyellow";

  const Icwd_text = document.createTextNode(`${cwd.join("/")}`);
  const Icwd = document.createElement("p");
  Icwd.appendChild(Icwd_text);
  Icwd.style.color = "violet";

  const command_name = document.createElement("p");
  const command_name_text = document.createTextNode(`$ ${command}`);
  command_name.appendChild(command_name_text);

  const history = document.createElement("div");
  history.appendChild(prefix);
  history.appendChild(Icwd);
  history.appendChild(command_name);
  history.classList.add("row");

  prev_cmds.appendChild(history);
  input.value = "";

  cont.scrollTop = cont.scrollHeight + 500;
}
