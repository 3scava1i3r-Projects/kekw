"use strict";

var web3btn = document.getElementById("web3connect");
var acc = document.getElementById("acc");
var test = document.getElementById("test");
var meme = document.getElementById("meme-image");
var Web3Modal = window.Web3Modal["default"];
var WalletConnectProvider = window.WalletConnectProvider["default"];
var selectedACC;
var selectedmeme = null;
var hh = null;
var inputarray = [];
var posturl = null;
var res_url = null;

var ConnectWallet = function ConnectWallet() {
  var providerOptions, web3Modal, provider, web3, accounts, chainId;
  return regeneratorRuntime.async(function ConnectWallet$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          providerOptions = {
            walletconnect: {
              "package": WalletConnectProvider,
              // required
              options: {
                infuraId: "d4c7101b7a7e45fd8adaaf71881b6be4" // required

              }
            },
            portis: {
              "package": Portis,
              // required
              options: {
                id: "b7d059de-0fea-4fbf-a725-143562297c30" // required

              }
            }
          };
          web3Modal = new Web3Modal({
            providerOptions: providerOptions // required

          });
          _context.next = 4;
          return regeneratorRuntime.awrap(web3Modal.connect());

        case 4:
          provider = _context.sent;
          web3 = new Web3(provider);
          _context.next = 8;
          return regeneratorRuntime.awrap(web3.eth.getAccounts());

        case 8:
          accounts = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(web3.eth.net.getId());

        case 11:
          chainId = _context.sent;
          console.log(chainId);
          selectedACC = accounts[0];
          acc.innerText = selectedACC;

          if (selectedACC != null | undefined) {
            console.log(selectedACC);
          } else {
            console.log("yo! connect the damn wallet");
          }

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};

web3btn.addEventListener("click", function () {
  ConnectWallet();
});
window.addEventListener("load", function () {
  getmeme();
});

var getmeme = function getmeme() {
  var options = {
    method: "GET"
  };
  fetch("https://api.imgflip.com/get_memes", options).then(function (response) {
    return response.json();
  }).then(function (res) {
    selectedmeme = res.data.memes;
    res.data.memes.map(function (_char, i) {
      content = "\n            <div id=\"meme-card\" class=\"card-meme\" >\n                <div id=\"meme-content\" value=".concat(i, ">\n                    <img src=\"").concat(_char.url, "\" alt=\"meme-image\" id=\"meme-image\" >\n                </div>\n            </div>");
      document.getElementById("meme-div").innerHTML += content;
    });
    var x = document.getElementsByClassName("card-meme");

    for (var i = 0; i < x.length; i++) {
      x[i].addEventListener("click", function () {
        var selectedEl = document.querySelector(".selected");

        if (selectedEl) {
          selectedEl.classList.remove("selected");
        }

        this.classList.add("selected");
      }, false);
    }

    ;
    document.getElementById("select").addEventListener("click", function () {
      var selectedEl = document.querySelector(".selected");

      if (selectedEl) {
        console.log(selectedmeme[selectedEl.children[0].attributes[1].value]);
        hh = selectedmeme[selectedEl.children[0].attributes[1].value];
        var lol = "\n                <img src=\"".concat(selectedmeme[selectedEl.children[0].attributes[1].value].url, "\" alt=\"selected_meme_img\" id=\"selected-img\">\n                ");
        document.getElementById("create-div").innerHTML = lol;

        for (var k = 0; k < selectedmeme[selectedEl.children[0].attributes[1].value].box_count; k++) {
          var input_fields = "\n                  <div class=\"meme-make-div\">               \n                    <input type=\"text\" id=\"inline_field\" class=\"nes-input input".concat(k, " meme-input\" placeholder=\"Text").concat(k + 1, "\">\n                  </div>\n                ");
          document.getElementById("create-div").innerHTML += input_fields;
        }
      } else alert("please choose an option");
    });
  });
};

document.getElementById("sendbtn").addEventListener("click", function () {
  console.log(hh);
  var url = "https://api.imgflip.com/caption_image?template_id=".concat(hh.id, "&username=SeekNDstroy1&password=winninguy4");

  for (var i = 0; i < hh.box_count; i++) {
    // console.log(document.querySelector(`.input${i}`).value);
    inputarray.push(document.querySelector(".input".concat(i)).value);
    url += "&text".concat(i, "=").concat(inputarray[i]); // console.log(url)

    if (i === hh.box_count - 1) {
      posturl = url;
    }
  }

  axios.post(posturl).then(function _callee(response) {
    var image, imageBlog, imageURL, link;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(response.data.data.url);
            res_url = response.data.data.url;
            _context2.next = 4;
            return regeneratorRuntime.awrap(fetch(res_url));

          case 4:
            image = _context2.sent;
            _context2.next = 7;
            return regeneratorRuntime.awrap(image.blob());

          case 7:
            imageBlog = _context2.sent;
            imageURL = URL.createObjectURL(imageBlog);
            link = document.createElement("a");
            link.href = imageURL;
            link.download = "image file name here";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
});