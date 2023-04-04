// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/main.js":[function(require,module,exports) {
var toggleEl = document.getElementById('toggle');
var headBarEl = document.querySelector('.head-bar');
var formEl = toggleEl.querySelector('form');
var searchBtnEl = toggleEl.querySelector('.search-btn');
var recommandEl = headBarEl.querySelector('.recommand');
var blackOpacityEl = headBarEl.querySelector('.blank-cancel');
var cancelBtnEl;

//검색 아이콘 클릭 했을때
searchBtnEl.addEventListener('click', function handleSearchBtnClick() {
  //버튼 숨기고 검색창 너비 넓힘
  searchBtnEl.style.display = 'none';
  toggleEl.classList.add('isClicked', 'isCentered');
  formEl.classList.remove('search');
  formEl.classList.add('search-sScreen');

  // 취소버튼 만들고 toggle 태그 자식으로 넣을거임
  cancelBtnEl = createCancelButton();
  toggleEl.appendChild(cancelBtnEl);

  // 검색어추천 섹션 나타나게 할거임
  recommandEl.style.display = 'flex';
  setTimeout(function () {
    // 0.09초후에 실행될 코드
    recommandEl.classList.add('recommand-transition');
  }, 90);

  // 밑에 요소들 검은투명박스로 가리기
  blackOpacityEl.style.display = 'block';
});

//취소버튼 만들고 취소버튼을 클릭했을때는?
function createCancelButton() {
  var cancelBtnEl = document.createElement('button');
  cancelBtnEl.classList.add('cancelButton', 'btn-appear');
  cancelBtnEl.textContent = '취소';
  cancelBtnEl.addEventListener('click', handleCancelBtnClick);
  return cancelBtnEl;
}

//이렇게 취소버튼 눌렀을때 돌아가고싶음.
function handleCancelBtnClick() {
  //아이콘보이게하고 클래스 원상복구
  searchBtnEl.style.display = 'block';
  toggleEl.classList.remove('isClicked', 'isCentered');
  formEl.classList.remove('search-sScreen');
  formEl.classList.add('search');
  // 캔슬버튼 없앰
  cancelBtnEl.remove();

  //추천검색어 리스트 지우기
  recommandEl.classList.remove('recommand-transition');
  recommandEl.style.display = 'none';

  //검은 투명박스 없애기
  blackOpacityEl.style.display = 'none';
}
var chattingBtnEl = headBarEl.querySelector('.chatting-btn__min-width');
var buttonNavEl = headBarEl.querySelector('.button-nav');
var chattingBtnIcon = chattingBtnEl.querySelector('span');
chattingBtnEl.addEventListener('click', function handlechattingBtnElClick() {
  //클릭 했을 때 nav-transition 클래스를 가지고 있으면 닫아야겠지?
  if (buttonNavEl.classList.contains('nav-transition')) {
    chattingBtnIcon.textContent = "menu";
    buttonNavEl.classList.remove('nav-transition');
    buttonNavEl.style.display = 'none';
  }
  //그럼 안가지고있으면? nav 선수 입장.
  else {
    chattingBtnIcon.textContent = "close";
    buttonNavEl.style.display = 'block';
    setTimeout(function () {
      buttonNavEl.classList.toggle('nav-transition');
    }, 90);
  }
});
var mediaQuery992 = window.matchMedia('(min-width: 992px)');
function handleMediaQueryChange(e) {
  if (e.matches) {
    // 웹 페이지의 너비가 992px 이상일 때 실행할 코드
    searchBtnEl.style.display = 'none';
    toggleEl.classList.remove('isClicked', 'isCentered');
    formEl.classList.remove('search-sScreen');
    formEl.classList.add('search');

    // 캔슬버튼 없앰
    cancelBtnEl.remove();

    //추천검색어 리스트 지우기
    recommandEl.classList.remove('recommand-transition');
    recommandEl.style.display = 'none';

    //검은 투명박스 없애기
    blackOpacityEl.style.display = 'none';
    chattingBtnIcon.textContent = "menu";
    buttonNavEl.classList.remove('nav-transition');
    buttonNavEl.style.display = 'none';
  } else {
    // 웹 페이지의 너비가 992px 미만일 때 실행할 코드
    searchBtnEl.style.display = 'block';
  }
}
mediaQuery992.addEventListener('change', handleMediaQueryChange);

// 페이지가 로드될 때 실행
handleMediaQueryChange(mediaQuery992);
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57379" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map