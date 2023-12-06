class Node {
  constructor(current) {
    this.current = current;
    this.children = {};
  }
}

export const DIR = new Node("root");
DIR.children.desktop = new Node("Desktop");
DIR.children.documents = new Node("Documents");
DIR.children.pictures = new Node("Pictures");
DIR.children.videos = new Node("Videos");
DIR.children.audio = new Node("Audio");

export const cd = (parent, to, cwd) => {
  if (parent.children[to]) {
    cwd = parent.current + `/${to}`;
    return [parent.children[to], cwd];
  } else if (to === "..") {
    let newcwd = cwd.split("/");
    newcwd.pop();
    cwd = newcwd.join("/");

    return [parent.children[to], cwd];
  } else {
    //     console.log("no directory matches");
  }
};

export const mkDir = (node, folder) => {
  node.children[folder] = new Node(folder);
};

export const touch = (node, file) => {
  node.children[file] = { current: file };
};
