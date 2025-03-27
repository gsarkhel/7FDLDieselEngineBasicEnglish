function reviewTool(debugMode, obj, connectorObj) {
  let counter = 0;
  const serverData = {};
  let outJSON = {};
  let data = {};
  const objToolWrapper = {};
  const css = {
    toolWrapper: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.8)",
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: 0,
    },
    toolWindow: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "column",
      width: "fit-content",
      minWidth: "60%",
      minHeight: "560px",
      height: "fit-content",
      background: "#dbdee6",
      borderRadius: "10px",
      border: 0,
    },
  };
  const init = () => {
    counter = 0;
    Object.keys(obj).forEach(function (i) {
      serverData[i] = obj[i];
    });
    outJSON = {
      courseName: serverData.courseName,
      reviewerName: serverData.reviewerName,
      pageName: "Page 3",
      timeStamp: "2021-09-01 12:00:00",
      reviewType: "Review Type",
      severity: "Severity",
      category: "Category",
      commentType: "Comment Type",
      commentsStatus: "Comments Status",
      reviewComments: "Review Comments",
    };
    //["Open", "Closed", "Closed - No Action", "Reopen", "Fixed", "Not Applicable"]
    data = {
      row0: ["Add Comment", ""],
      row1: ["Course Name", "Reviewer Name", "Page Name"],
      row2: [
        `${serverData.courseName} - ${
          document.querySelector(".moduleName").innerHTML
        }`,
        serverData.reviewerName,
        `Page ${
          document.querySelector(".pgNum").innerHTML.split("/")[0].split(":")[1]
        }`,
      ],
      row3: ["Time Stamp", "Review Type*", "Severity*"],
      row4: [
        "input",
        ["Learning Manager", "PM", "SME", "Technical"],
        ["Low", "Medium", "High"],
      ],
      row5: ["Category*", "Comment Type*", "Comments Status"],
      row6: [
        [
          "Audio",
          "Content",
          "Edit",
          "Functionality",
          "Graphics",
          "ID",
          "Video",
        ],
        ["Change", "Detect", "Question", "Suggestion"],
        "",
      ],
      row7: ["Review Comments (max 10000 Characters)*"],
      row8: ["textarea"],
    };
    this.hideTool();
    // Wrapper added
    objToolWrapper["toolWrapper"] = document.createElement("div");
    objToolWrapper["toolWrapper"].classList.add("toolWrapper");
    for (i in css["toolWrapper"])
      objToolWrapper["toolWrapper"].style[i] = css["toolWrapper"][i];
    document
      .querySelector(".ui-page")
      .appendChild(objToolWrapper["toolWrapper"]);

    // Tool window added
    objToolWrapper["toolWindow"] = document.createElement("div");
    objToolWrapper["toolWindow"].classList.add("toolWindow");
    for (i in css["toolWindow"])
      objToolWrapper["toolWindow"].style[i] = css["toolWindow"][i];
    objToolWrapper["toolWrapper"].appendChild(objToolWrapper["toolWindow"]);

    // Create table0 =================================================
    const table0 = document.createElement("table");
    table0.style.width = "98%";
    table0.style.height = "50px";
    table0.style.fontSize = "17px";
    table0.style.fontWeight = "bold";
    table0.style.borderCollapse = "collapse";
    // Create rows and columns
    for (let row = 0; row < 1; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < 2; col++) {
        const td = document.createElement("td");
        // td.style.border = '1px solid #000';
        td.style.padding = "8px";
        tr.appendChild(td);
        if (col === 0) {
          td.textContent = `${data.row0[col]}`;
        } else {
          td.style.padding = "8px 0";
          td.style.textAlign = "right";
          const img = new Image();
          img.src =
            "data:image/png;base64,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";
          img.style.width = "30px";
          img.style.height = "auto";
          img.style.cursor = "pointer";
          img.onclick = () => {
            this.hideTool();
          };
          td.appendChild(img);
        }
      }
      table0.appendChild(tr);
    }
    // Append table to toolWindow
    objToolWrapper["toolWindow"].appendChild(table0);

    // Create HR Tag =================================================
    const hr = document.createElement("hr");
    hr.style.width = "99%";
    hr.style.margin = "0px";
    hr.style.borderColor = "#dfdbdb";
    objToolWrapper["toolWindow"].appendChild(hr);

    // Create table1 =================================================
    const table1 = document.createElement("table");
    table1.style.width = "98%";
    table1.style.height = "30px";
    table1.style.borderCollapse = "collapse";
    table1.style.fontSize = "16px";
    // create blank row
    createBlankRow(table1);
    // Create rows and columns
    for (let row = 0; row < 1; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < 3; col++) {
        const td = document.createElement("td");
        // td.style.border = '1px solid #000';
        td.style.padding = "8px";
        td.style.width = "33%";
        td.style.color = "#415065";
        td.style.fontWeight = "bold";
        td.textContent = `${data.row1[col]}`;
        tr.appendChild(td);
      }
      table1.appendChild(tr);
    }
    // Create rows and columns
    for (let row = 0; row < 1; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < 3; col++) {
        const td = document.createElement("td");
        // td.style.border = '1px solid #000';
        td.id = `data_${counter++}`;
        td.style.padding = "8px";
        td.style.width = "33%";
        td.style.color = "#000";
        td.textContent = `${data.row2[col]}`;
        tr.appendChild(td);
      }
      table1.appendChild(tr);
    }
    // create blank row
    createBlankRow(table1);
    // Create rows and columns
    for (let row = 0; row < 1; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < 3; col++) {
        const td = document.createElement("td");
        // td.style.border = '1px solid #000';
        td.style.padding = "8px";
        td.style.width = "33%";
        td.style.color = "#415065";
        td.style.fontWeight = "bold";
        td.appendChild(convertText(`${data.row3[col]}`, true));
        tr.appendChild(td);
      }
      table1.appendChild(tr);
    }
    // Create rows and columns
    for (let row = 0; row < 1; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < 3; col++) {
        const td = document.createElement("td");
        // td.style.border = '1px solid #000';
        td.style.padding = "8px";
        td.style.width = "33%";
        td.style.color = "#000";
        if (typeof data.row4[col] === "object") {
          createDropDown(data.row4[col], td, `data_${counter++}`);
        } else if (data.row4[col] === "input") {
          createInput(td, `data_${counter++}`);
        } else if (data.row4[col] === "textarea") {
          createTextArea(td, `data_${counter++}`);
        }
        // td.textContent = `${data.row4[col]}`;
        tr.appendChild(td);
      }
      table1.appendChild(tr);
    }
    // create blank row
    createBlankRow(table1);
    // Create rows and columns
    for (let row = 0; row < 1; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < 3; col++) {
        const td = document.createElement("td");
        // td.style.border = '1px solid #000';
        td.style.padding = "8px";
        td.style.width = "33%";
        td.style.color = "#415065";
        td.style.fontWeight = "bold";
        td.appendChild(convertText(`${data.row5[col]}`, true));
        tr.appendChild(td);
      }
      table1.appendChild(tr);
    }
    // Create rows and columns
    for (let row = 0; row < 1; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < 3; col++) {
        const td = document.createElement("td");
        // td.style.border = '1px solid #000';
        td.style.padding = "8px";
        td.style.width = "33%";
        td.style.color = "#000";
        if (typeof data.row6[col] === "object") {
          createDropDown(data.row6[col], td, `data_${counter++}`);
        } else if (data.row6[col] === "input") {
          createInput(td, `data_${counter++}`);
        } else if (data.row6[col] === "textarea") {
          createTextArea(td, `data_${counter++}`);
        } else if (data.row6[col] === "") {
          td.appendChild(convertText("Open", false));
        }
        // td.textContent = `${data.row4[col]}`;
        tr.appendChild(td);
      }
      table1.appendChild(tr);
    }
    // create blank row
    createBlankRow(table1);
    // Create rows and columns
    for (let row = 0; row < 1; row++) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.style.padding = "8px";
      td.style.width = "33%";
      td.style.color = "#415065";
      td.style.fontWeight = "bold";
      td.colSpan = 3;
      td.appendChild(convertText(`${data.row7[0]}`, true));
      tr.appendChild(td);
      //
      table1.appendChild(tr);
    }
    // Create rows and columns
    for (let row = 0; row < 1; row++) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      // td.style.border = '1px solid #000';
      td.style.padding = "8px";
      td.style.width = "33%";
      td.style.color = "#000";
      td.colSpan = 3;

      if (typeof data.row8[0] === "object") {
        createDropDown(data.row8[0], td, `data_${counter++}`);
      } else if (data.row8[0] === "input") {
        createInput(td, `data_${counter++}`);
      } else if (data.row8[0] === "textarea") {
        createTextArea(td, `data_${counter++}`);
      }
      // td.textContent = `${data.row4[col]}`;
      tr.appendChild(td);
      //
      table1.appendChild(tr);
    }
    // create blank row
    createBlankRow(table1);
    // Append table to toolWindow
    objToolWrapper["toolWindow"].appendChild(table1);

    // Create blank div
    const blankDiv = document.createElement("div");
    blankDiv.style.width = "98%";
    blankDiv.style.height = "fit-content";
    blankDiv.style.textAlign = "right";
    blankDiv.style.marginBottom = "20px";

    // Append blank div to toolWindow
    objToolWrapper["toolWindow"].appendChild(blankDiv);

    createButton(
      "add",
      "Add Comment",
      blankDiv,
      "gradient",
      () => {
        let lCounter = 0;
        for (let i in outJSON) {
          outJSON[i] = document.getElementById(`data_${lCounter}`)
            ? lCounter < 3
              ? document.getElementById(`data_${lCounter}`).innerHTML
              : document.getElementById(`data_${lCounter}`).value
            : "";
          lCounter++;
        }
        const data = outJSON["courseName"].split(" - ");
        outJSON["courseName"] = data[0];
        outJSON["moduleName"] = data[1];
        outJSON["courseId"] = serverData.courseId;
        outJSON["reviewerId"] = serverData.reviewerId;
        outJSON["reviewComments"] = outJSON["commentsStatus"];
        outJSON["commentsStatus"] = "Open";
        const div = document.createElement("div");
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.position = "absolute";
        div.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        div.style.zIndex = "9999";
        div.style.display = "flex";
        div.style.justifyContent = "center";
        div.style.alignItems = "center";
        objToolWrapper["toolWindow"].appendChild(div);
        const img = new Image();
        img.src = "templates/images/loader.gif";
        img.style.width = "60px";
        img.style.height = "60px";
        div.appendChild(img);
        // Below 3 lines are just for debugging purpose. Remove it later.
        // div.remove();
        // this.hideTool();
        // alert('Data sent to server');
        //
        console.log(outJSON);
        connectorObj.setServerData(outJSON, (msg) => {
          div.remove();
          this.hideTool();
          if (msg.toLowerCase() === "success") {
            alert("Comment Saved.");
          } else {
            alert("Internal Error, Comment is not Save.");
          }
        });
      },
      false
    );
    createButton(
      "cancel",
      "Cancel",
      blankDiv,
      "#6c757d",
      () => {
        this.hideTool();
      },
      true
    );
  };
  const convertText = (text, bool) => {
    const div = document.createElement("div");
    if (bool) {
      div.style.fontWeight = "bold";
    }
    const span = document.createElement("span");
    span.style.color = "red";
    span.textContent = "*";
    let data1 = text.indexOf("*") > -1;
    if (data1) {
      text = `${text.replace("*", "")}${span.outerHTML}`;
    }
    div.innerHTML = text;
    return div;
  };
  const createBlankRow = (table) => {
    const tr = document.createElement("tr");
    tr.style.height = "10px";
    table.appendChild(tr);
  };
  const createDropDown = (lists, holder, id) => {
    // Create generic dropdown
    const dropDown = document.createElement("select");
    dropDown.id = id;
    dropDown.style.width = "230px";
    dropDown.style.height = "40px";
    dropDown.style.fontSize = "16px";
    dropDown.style.padding = "0 8px";
    dropDown.style.borderRadius = "5px";

    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Select";
    option.disabled = true;
    option.selected = true;
    option.hidden = true;
    dropDown.appendChild(option);

    lists.forEach((list) => {
      const option = document.createElement("option");
      option.value = list;
      option.textContent = list;
      dropDown.appendChild(option);
    });
    dropDown.addEventListener("change", () => {
      checkFormData();
    });
    // Append dropdown to holder
    holder.appendChild(dropDown);
  };
  const createInput = (holder, id) => {
    const input = document.createElement("input");
    input.id = id;
    input.type = "text";
    input.placeholder = "e.g., 00:15";
    input.style.width = "210px";
    input.style.height = "40px";
    input.style.fontSize = "16px";
    input.style.padding = "0 8px";
    input.style.borderRadius = "5px";

    // Append input to holder
    holder.appendChild(input);
  };
  const createTextArea = (holder, id) => {
    const textarea = document.createElement("textarea");
    textarea.id = id;
    textarea.placeholder = "Enter your comments here...";
    textarea.style.width = "770px";
    textarea.style.height = "66px";
    textarea.style.fontSize = "16px";
    textarea.style.padding = "8px";
    textarea.style.borderRadius = "5px";
    textarea.maxLength = 10000;

    // Add character count display div
    const charCount = document.createElement("div");
    charCount.style.textAlign = "left";
    charCount.style.color = "#000";
    charCount.style.fontSize = "14px";
    charCount.style.marginTop = "4px";
    charCount.textContent = "Remaining Characters 10000";

    // Add input event listener for character count
    textarea.addEventListener("input", () => {
      const count = textarea.value.length;
      const remaningChar = 10000 - count;
      charCount.textContent = `Remaining Characters ${remaningChar}`;
      checkFormData();
    });

    // Append textarea and character count
    // textarea.addEventListener('input', () => {
    //     checkFormData();
    // });

    // Append textarea to holder
    holder.appendChild(textarea);
    holder.appendChild(charCount);
  };
  const createButton = (id, text, holder, color, callBack, bool) => {
    const button = document.createElement("button");
    button.id = id;
    button.classList.add("btn", "btn-primary");
    button.textContent = text;
    button.style.marginRight = "10px";
    button.style.padding = "10px 20px";
    button.style.fontSize = "16px";
    button.style.borderRadius = "5px";
    button.style.border = "none";
    button.style.whiteSpace = "nowrap";
    if (color === "gradient") {
      const normal = "linear-gradient(to right, #1b9d71, #3c7e83)";
      const hover = "linear-gradient(to right, #17a14e, #1a3159)";
      button.style.backgroundImage = normal;
      button.addEventListener("mouseover", () => {
        button.style.backgroundImage = hover;
      });
      button.addEventListener("mouseout", () => {
        button.style.backgroundImage = normal;
      });
    } else {
      button.style.backgroundColor = color;
    }
    button.style.color = "white";
    button.style.borderColor = color;
    holder.appendChild(button);
    button.style.cursor = "pointer";
    button.onclick = () => {
      if (callBack) {
        callBack();
      }
    };
    if (!bool) {
      disableButton(button);
    }
  };
  const disableButton = (button) => {
    button.style.opacity = "0.7";
    button.style.cursor = "default";
    button.disabled = true;
    button.style.backgroundImage = "none";
    button.style.backgroundColor = "#6c757d";
  };
  const enableButton = (button) => {
    button.style.opacity = "1";
    button.style.cursor = "pointer";
    button.disabled = false;
    button.style.backgroundImage =
      "linear-gradient(90deg, #1f9973 0%, #3a8184)";
    button.style.backgroundColor = "#007bff";
  };
  const checkFormData = () => {
    let lCounter = 0;
    let bool = true;
    for (let i in outJSON) {
      // Below code will check for 5 dropdowns and 1 textarea
      if (lCounter > 3) {
        if (
          document.getElementById(`data_${lCounter}`) &&
          document.getElementById(`data_${lCounter}`).value === ""
        ) {
          bool = false;
          break;
        }
      }
      lCounter++;
    }
    if (bool) {
      enableButton(document.getElementById("add"));
    } else {
      disableButton(document.getElementById("add"));
    }
  };
  const destroy = () => {};
  this.showTool = () => {
    init();
  };
  this.hideTool = () => {
    if (document.querySelector(".toolWrapper")) {
      document.querySelector(".toolWrapper").remove();
    }
  };
  this.createButton = createButton;
}
// const inJSON = {
// 	reviewerName: "John Doe",
// }
// const cl = new reviewTool(true, inJSON);
// cl.showTool();

function checkMode() {
  const connectorObj = new connector();
  const buttonWrapper = document.querySelector("#revTool");
  $(buttonWrapper).unbind("click");
  const debugMode = connectorObj.isDebugMode ? true : false;
  if (debugMode) {
    connectorObj.getServerData(
      (jsonData) => {
        const cl = new reviewTool(true, jsonData, connectorObj);
        cl.createButton(
          "showTool",
          "Add Comment",
          buttonWrapper,
          "gradient",
          () => {
            cl.showTool();
          },
          true
        );
      },
      () => console.log("getServerData ERROR")
    );
  }
}

function connector() {
  const params = new Proxy(
    new URLSearchParams(window.top.opener.location.search),
    {
      get: (searchParams, prop) => searchParams.get(prop),
    }
  );
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  const access_token = params.access_token;
  const course_uuid = params.course_uuid;
  if (access_token === null) {
    this.isDebugMode = false;
  } else {
    this.isDebugMode = true;
  }
  console.log("this.isDebugMode", this.isDebugMode);
  // ================================
  //   this.getServerData = window.top.getServerData;
  //   this.setServerData = window.top.setServerData;
  //   this.isDebugMode = typeof this.getServerData === "function" ? true : false;
  //   if (!this.isDebugMode) {
  //     this.getServerData = function () {
  //       return {
  //         reviewerName: "Parent Name",
  //         courseName: "Parent Course",
  //         reviewerId: 5,
  //         courseId: 2,
  //       };
  //     };
  //   }
  // ================================
  var getURL = `http://127.0.0.1:8000/api/get_data?course_uuid=${course_uuid}`;
  var setURL = "http://127.0.0.1:8000/api/set_data";
  this.getServerData = function (resolve, reject) {
    console.log("getServerData function called", course_uuid);

    fetch(getURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("getServerData Response: ", data);
        resolve(data);
      })
      .catch((error) => {
        console.error("getServerData Error:", error);
        reject(error);
      });
  };

  this.setServerData = function (resolve, reject) {
    console.log("setServerData function called", course_uuid);

    fetch(getURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => {
        console.log("setServerData Response: ", response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("setServerData data: ", data);
        // resolve(data);
      })
      .catch((error) => {
        console.error("setServerData Error:", error);
        reject(error);
      });
  };
}
