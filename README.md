## Resuable UI Componenents used in the Family Tree App

---

<br>

### NavTree

UI Component to load and edit the JSON data which is structured to create a tree easily.
<img width="450" alt="Screenshot 2021-05-15 at 3 06 12 AM" src="https://user-images.githubusercontent.com/83978810/118334093-846e3100-b52a-11eb-9ef8-de7432f8d654.png">
<img width="450" alt="Screenshot 2021-05-15 at 3 06 58 AM" src="https://user-images.githubusercontent.com/83978810/118334143-9ea80f00-b52a-11eb-8450-245a3d55332e.png">

```JS
import { NavTree } from '@subhashjha/ftcomponents';
```

#### Usage

```JS
<NavTree 
    theme: "dark",
    data: treeData,
    width: "100vw",
    height: "100vh"
/>
```
<br>

### TreeViewer

Component to load the tree json data and display it in a tree like structure. It uses react-tree-graph and d3 libraries.

![treeviewer](https://user-images.githubusercontent.com/83978810/118334685-ae742300-b52b-11eb-8a76-e7959b7365b4.gif)

```JS
import { TreeViewer } from '@subhashjha/ftcomponents';
```
#### Usage

```JS
<TreeViewer 
    theme: "dark",
    data: treeData,
    width: "100vw",
    height: "100vh"
/>
```

<br>

### Sample Input Data (treeData)

```JSON
{
    "1":{
        "id" : "1",
        "name" : "Rajev Gupta",
        "children" : ["2", "3"],
        "isRoot" : "true",
        "partner" : "Aastha Gupta"
    },
    "2":{
        "id" : "2",
        "name" : "Sanjeev kumar Gupta",
        "children" : [],
        "partner" : "Chaaru Gupta"
    },
    "3":{
        "id" : "3",
        "name" : "Abhishek kumar Gupta",
        "children" : ["4", "5", "6"],
        "partner" : "Malaika Gupta"
    },
    "4":{
        "id" : "4",
        "name" : "Anirudh Gupta",
        "children" : [],
        "partner" : "Aasha Gupta"
    },
    "5":{
        "id" : "5",
        "name" : "Kamlesh Gupta",
        "children" : [],
        "partner" : "Radhika Gupta"
    },
    "6":{
        "id" : "6",
        "name" : "Akhilesh kumar Gupta",
        "children" : ["7"],
        "partner" : "Aarju Gupta"
    },
    "7":{
        "id" : "7",
        "name" : "Lokesh Gupta",
        "children" : ["8", "9"],
        "partner" : "Kalyani Gupta"
    },
    "8":{
        "id" : "8",
        "name" : "Rahul Gupta",
        "children" : [],
        "partner" : "Roshani Gupta"
    },
    "9":{
        "id" : "9",
        "name" : "Yahlika Gupta",
        "children" : [],
        "partner" : "Saurabh Gupta"
    }
}
```
<br>

### Building from codes
- Clone the repository
- Run `npm install`
- Run `yarn storybook` for viewing the Componenents
- Run `yarn build` to create a buld in `dist` folder

<br>

> More customization coming soon ... :smile: