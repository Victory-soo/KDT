!(function (e) {
    var t = {};
    function i(s) {
        if (t[s]) return t[s].exports;
        var n = (t[s] = { i: s, l: !1, exports: {} });
        return e[s].call(n.exports, n, n.exports, i), (n.l = !0), n.exports;
    }
    (i.m = e),
        (i.c = t),
        (i.d = function (e, t, s) {
            i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: s });
        }),
        (i.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (i.t = function (e, t) {
            if ((1 & t && (e = i(e)), 8 & t)) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var s = Object.create(null);
            if ((i.r(s), Object.defineProperty(s, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
                for (var n in e)
                    i.d(
                        s,
                        n,
                        function (t) {
                            return e[t];
                        }.bind(null, n)
                    );
            return s;
        }),
        (i.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return i.d(t, "a", t), t;
        }),
        (i.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (i.p = "/"),
        i((i.s = 134));
})([
    function (e, t) {
        e.exports = function (e) {
            return e && e.__esModule ? e : { default: e };
        };
    },
    function (e, t, i) {
        "use strict";
        const s = {
            GUI_INSTANCE: null,
            ANIM_INSTANCE: null,
            VIEWPORT_EMITTER_ELEMENT: void 0,
            LOCAL_STORAGE_KEYS: { GuiPosition: "anim-ui.position", GroupCollapsedStates: "anim-ui.group-collapsed-states", scrollY: "anim-ui.scrollY-position", path: "anim-ui.path" },
            RESIZE_TIMEOUT: -1,
            BREAKPOINTS: [
                { name: "S", mediaQuery: "only screen and (max-width: 734px)" },
                { name: "M", mediaQuery: "only screen and (max-width: 1068px)" },
                { name: "L", mediaQuery: "only screen and (min-width: 1069px)" },
            ],
            getBreakpoint: function () {
                for (let e = 0; e < s.BREAKPOINTS.length; e++) {
                    let t = s.BREAKPOINTS[e];
                    if (window.matchMedia(t.mediaQuery).matches) return t.name;
                }
            },
            KeyframeDefaults: {
                ease: 1,
                epsilon: 0.05,
                preserveState: !1,
                easeFunctionString: "linear",
                easeFunction: "linear",
                hold: !1,
                snapAtCreation: !1,
                toggle: !1,
                breakpointMask: "SMLX",
                event: "",
                disabledWhen: [],
                cssClass: "",
            },
            KeyframeTypes: { Interpolation: 0, InterpolationForward: 1, CSSClass: 2, Event: 3 },
            EVENTS: {
                ON_DOM_KEYFRAMES_CREATED: "ON_DOM_KEYFRAMES_CREATED",
                ON_DOM_GROUPS_CREATED: "ON_DOM_GROUPS_CREATED",
                ON_GROUP_CREATED: "ON_GROUP_CREATED",
                ON_KEYFRAME_UPDATED: "ON_KEYFRAME_UPDATED",
                ON_TIMELINE_START: "ON_TIMELINE_START",
                ON_TIMELINE_UPDATE: "ON_TIMELINE_UPDATE",
                ON_TIMELINE_COMPLETE: "ON_TIMELINE_COMPLETE",
                ON_CHAPTER_INITIATED: "ON_CHAPTER_INITIATED",
                ON_CHAPTER_OCCURRED: "ON_CHAPTER_OCCURRED",
                ON_CHAPTER_COMPLETED: "ON_CHAPTER_COMPLETED",
            },
            PageEvents: { ON_SCROLL: "ON_SCROLL", ON_RESIZE_IMMEDIATE: "ON_RESIZE_IMMEDIATE", ON_RESIZE_DEBOUNCED: "ON_RESIZE_DEBOUNCED", ON_BREAKPOINT_CHANGE: "ON_BREAKPOINT_CHANGE" },
            KeyframeJSONReservedWords: ["event", "cssClass", "style", "anchors", "start", "end", "epsilon", "easeFunction", "ease", "breakpointMask", "disabledWhen"],
            TweenProps: i(27),
            TargetValue: i(4),
            CSSTargetValue: i(28),
            pageMetrics: new (function () {
                (this.scrollX = 0),
                    (this.scrollY = 0),
                    (this.windowWidth = 0),
                    (this.windowHeight = 0),
                    (this.documentOffsetX = 0),
                    (this.documentOffsetY = 0),
                    (this.previousBreakpoint = ""),
                    (this.breakpoint = "");
            })(),
            KeyframeComparison: function (e, t) {
                return e.start < t.start ? -1 : e.start > t.start ? 1 : 0;
            },
        };
        e.exports = s;
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            PICTURE_DATA_DOWNLOAD_AREA_KEYFRAME: "data-download-area-keyframe",
            PICTURE_DATA_LAZY: "data-lazy",
            PICTURE_DATA_EMPTY_SOURCE: "data-empty",
            PICTURE_DATA_LOADED: "data-picture-loaded",
            PICTURE_CLASS_LOADED: "loaded",
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = { EventEmitterMicro: i(12) };
    },
    function (e, t, i) {
        "use strict";
        e.exports = class {
            constructor(e, t, i, s) {
                let n = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                    r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : void 0;
                (this.epsilon = parseFloat(t)),
                    (this.snapAtCreation = i),
                    (this.initialValue = e),
                    (this.target = e),
                    (this.current = e),
                    (this.previousValue = e),
                    (this.isActive = !1),
                    (this.key = s),
                    (this.round = n),
                    (this.suffix = r);
            }
            update(e, t, i) {
                (this.target = e[0] + t * (e[1] - e[0])), (this.previousValue = this.current), (this.current += (this.target - this.current) * i);
                let s = this.delta(this.current, this.target);
                return s < this.epsilon && ((this.current = this.target), (s = 0)), s > this.epsilon || (0 === s && this.previousValue !== this.current);
            }
            reconcile(e, t) {
                return (this.initialValue = e[0]), this.update(e, t, 1);
            }
            needsUpdate() {
                return this.delta(this.current, this.target) > this.epsilon;
            }
            delta(e, t) {
                return Math.abs(e - t);
            }
            calculateEpsilon(e, t) {
                if (e.epsilon) return void (this.epsilon = e.epsilon);
                let i = this.delta(t[0], t[1]),
                    s = Math.min(0.001 * i, this.epsilon, 0.05);
                this.epsilon = Math.max(s, 0.001);
            }
            set(e) {
                let t = this.current;
                this.round && (t = Math.round(t)), this.suffix && (t += this.suffix), (e[this.key] = t);
            }
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            lerp: function (e, t, i) {
                return t + (i - t) * e;
            },
            map: function (e, t, i, s, n) {
                return s + ((n - s) * (e - t)) / (i - t);
            },
            mapClamp: function (e, t, i, s, n) {
                var r = s + ((n - s) * (e - t)) / (i - t);
                return Math.max(s, Math.min(n, r));
            },
            norm: function (e, t, i) {
                return (e - t) / (i - t);
            },
            clamp: function (e, t, i) {
                return Math.max(t, Math.min(i, e));
            },
            randFloat: function (e, t) {
                return Math.random() * (t - e) + e;
            },
            randInt: function (e, t) {
                return Math.floor(Math.random() * (t - e) + e);
            },
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(3).EventEmitterMicro,
            n = { create: i(10), update: i(15), draw: i(11) },
            r = () => {};
        let o = 0;
        e.exports = class extends s {
            constructor(e) {
                super(), (this.el = e.el), (this.gum = e.gum), (this.componentName = e.componentName), (this._keyframeController = null);
            }
            destroy() {
                (this.el = null), (this.gum = null), (this._keyframeController = null), super.destroy();
            }
            addKeyframe(e) {
                const t = e.el || this.el;
                return (e.group || this.anim).addKeyframe(t, e);
            }
            addDiscreteEvent(e) {
                e.event = e.event || "Generic-Event-Name-" + o++;
                let t = void 0 !== e.end && e.end !== e.start;
                const i = this.addKeyframe(e);
                return (
                    t
                        ? (e.onEnterOnce && i.controller.once(e.event + ":enter", e.onEnterOnce),
                          e.onExitOnce && i.controller.once(e.event + ":exit", e.onExitOnce),
                          e.onEnter && i.controller.on(e.event + ":enter", e.onEnter),
                          e.onExit && i.controller.on(e.event + ":exit", e.onExit))
                        : (e.onEventOnce && i.controller.once(e.event, e.onEventOnce),
                          e.onEventReverseOnce && i.controller.once(e.event + ":reverse", e.onEventReverseOnce),
                          e.onEvent && i.controller.on(e.event, e.onEvent),
                          e.onEventReverse && i.controller.on(e.event + ":reverse", e.onEventReverse)),
                    i
                );
            }
            addRAFLoop(e) {
                let t = ["start", "end"];
                if (!t.every((t) => e.hasOwnProperty(t))) return void console.log("BubbleGum.BaseComponent::addRAFLoop required options are missing: " + t.join(" "));
                const i = new n.create();
                i.on("update", e.onUpdate || r), i.on("draw", e.onDraw || r), i.on("draw", () => i.run());
                const { onEnter: s, onExit: o } = e;
                return (
                    (e.onEnter = () => {
                        i.run(), s && s();
                    }),
                    (e.onExit = () => {
                        i.cancel(), o && o();
                    }),
                    this.addDiscreteEvent(e)
                );
            }
            addContinuousEvent(e) {
                e.onDraw || console.log("BubbleGum.BaseComponent::addContinuousEvent required option `onDraw` is missing. Consider using a regular keyframe if you do not need a callback"),
                    (e.event = e.event || "Generic-Event-Name-" + o++);
                let t = this.addKeyframe(e);
                return t.controller.on(e.event, e.onDraw), t;
            }
            mounted() {}
            onResizeImmediate(e) {}
            onResizeDebounced(e) {}
            onBreakpointChange(e) {}
            get anim() {
                return this.gum.anim;
            }
            get keyframeController() {
                return this._keyframeController || (this._keyframeController = this.anim.getControllerForTarget(this.el));
            }
            get pageMetrics() {
                return this.anim.model.pageMetrics;
            }
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            AUTOCOMPLETE: "aria-autocomplete",
            CHECKED: "aria-checked",
            DISABLED: "aria-disabled",
            EXPANDED: "aria-expanded",
            HASPOPUP: "aria-haspopup",
            HIDDEN: "aria-hidden",
            INVALID: "aria-invalid",
            LABEL: "aria-label",
            LEVEL: "aria-level",
            MULTILINE: "aria-multiline",
            MULTISELECTABLE: "aria-multiselectable",
            ORIENTATION: "aria-orientation",
            PRESSED: "aria-pressed",
            READONLY: "aria-readonly",
            REQUIRED: "aria-required",
            SELECTED: "aria-selected",
            SORT: "aria-sort",
            VALUEMAX: "aria-valuemax",
            VALUEMIN: "aria-valuemin",
            VALUENOW: "aria-valuenow",
            VALUETEXT: "aria-valuetext",
            ATOMIC: "aria-atomic",
            BUSY: "aria-busy",
            LIVE: "aria-live",
            RELEVANT: "aria-relevant",
            DROPEFFECT: "aria-dropeffect",
            GRABBED: "aria-grabbed",
            ACTIVEDESCENDANT: "aria-activedescendant",
            CONTROLS: "aria-controls",
            DESCRIBEDBY: "aria-describedby",
            FLOWTO: "aria-flowto",
            LABELLEDBY: "aria-labelledby",
            OWNS: "aria-owns",
            POSINSET: "aria-posinset",
            SETSIZE: "aria-setsize",
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(16));
        var r = class {
            constructor(e) {
                (this.options = e), (this.media = e.media), (this.mounted = this.mounted.bind(this)), this.media.on(n.default.MOUNTED, this.mounted);
            }
            mounted() {}
            static get isSupported() {
                return !0;
            }
            destroy() {}
        };
        t.default = r;
    },
    function (e, t, i) {
        "use strict";
        var s = i(75),
            n = function () {
                this.events = {};
            },
            r = n.prototype;
        (r.requestAnimationFrame = function (e) {
            return this.events[e] || (this.events[e] = new s(e)), this.events[e].requestAnimationFrame;
        }),
            (r.cancelAnimationFrame = function (e) {
                return this.events[e] || (this.events[e] = new s(e)), this.events[e].cancelAnimationFrame;
            }),
            (e.exports = new n());
    },
    function (e, t, i) {
        "use strict";
        var s,
            n = i(3).EventEmitterMicro,
            r = i(77),
            o = i(80);
        function a(e) {
            (e = e || {}), n.call(this), (this.id = o.getNewID()), (this.executor = e.executor || r), this._reset(), (this._willRun = !1), (this._didDestroy = !1);
        }
        ((s = a.prototype = Object.create(n.prototype)).run = function () {
            return this._willRun || (this._willRun = !0), this._subscribe();
        }),
            (s.cancel = function () {
                this._unsubscribe(), this._willRun && (this._willRun = !1), this._reset();
            }),
            (s.destroy = function () {
                var e = this.willRun();
                return this.cancel(), (this.executor = null), n.prototype.destroy.call(this), (this._didDestroy = !0), e;
            }),
            (s.willRun = function () {
                return this._willRun;
            }),
            (s.isRunning = function () {
                return this._isRunning;
            }),
            (s._subscribe = function () {
                return this.executor.subscribe(this);
            }),
            (s._unsubscribe = function () {
                return this.executor.unsubscribe(this);
            }),
            (s._onAnimationFrameStart = function (e) {
                (this._isRunning = !0), (this._willRun = !1), this._didEmitFrameData || ((this._didEmitFrameData = !0), this.trigger("start", e));
            }),
            (s._onAnimationFrameEnd = function (e) {
                this._willRun || (this.trigger("stop", e), this._reset());
            }),
            (s._reset = function () {
                (this._didEmitFrameData = !1), (this._isRunning = !1);
            }),
            (e.exports = a);
    },
    function (e, t, i) {
        "use strict";
        var s = i(9);
        e.exports = s.requestAnimationFrame("draw");
    },
    function (e, t, i) {
        "use strict";
        function s() {
            this._events = {};
        }
        var n = s.prototype;
        (n.on = function (e, t) {
            (this._events[e] = this._events[e] || []), this._events[e].unshift(t);
        }),
            (n.once = function (e, t) {
                var i = this;
                this.on(e, function s(n) {
                    i.off(e, s), void 0 !== n ? t(n) : t();
                });
            }),
            (n.off = function (e, t) {
                if (this.has(e)) {
                    if (1 === arguments.length) return (this._events[e] = null), void delete this._events[e];
                    var i = this._events[e].indexOf(t);
                    -1 !== i && this._events[e].splice(i, 1);
                }
            }),
            (n.trigger = function (e, t) {
                if (this.has(e)) for (var i = this._events[e].length - 1; i >= 0; i--) void 0 !== t ? this._events[e][i](t) : this._events[e][i]();
            }),
            (n.has = function (e) {
                return e in this._events != !1 && 0 !== this._events[e].length;
            }),
            (n.destroy = function () {
                for (var e in this._events) this._events[e] = null;
                this._events = null;
            }),
            (e.exports = s);
    },
    function (e, t, i) {
        "use strict";
        const s = i(1),
            n = i(4),
            r = i(28),
            o = i(5),
            a = i(44),
            l = i(64),
            h = i(65),
            c = i(17),
            u = i(66),
            d = i(29),
            m = i(30),
            { cssAttributes: p, suffixFreeAttributes: f, domAttributes: _ } = i(31);
        class g {
            constructor(e, t) {
                (this.controller = e),
                    (this.anchors = []),
                    (this.jsonProps = t),
                    (this.ease = e.group.defaultEase),
                    (this.easeFunction = a.linear),
                    (this.start = 0),
                    (this.end = 0),
                    (this.localT = 0),
                    (this.curvedT = 0),
                    (this.id = 0),
                    (this.event = ""),
                    (this.needsEventDispatch = !1),
                    (this.snapAtCreation = !1),
                    (this.isEnabled = !1),
                    (this.animValues = {}),
                    (this.breakpointMask = s.KeyframeDefaults.breakpointMask),
                    (this.disabledWhen = []),
                    (this.keyframeType = s.KeyframeTypes.Interpolation),
                    (this.hold = !1),
                    (this.preserveState = !1),
                    (this.markedForRemoval = !1);
                let i = !1;
                Object.defineProperty(this, "hidden", {
                    get: () => i,
                    set(t) {
                        (i = t), (e.group.keyframesDirty = !0);
                    },
                }),
                    (this.uuid = m()),
                    (this.destroyed = !1);
            }
            destroy() {
                (this.destroyed = !0), (this.controller = null), (this.disabledWhen = null), (this.anchors = null), (this.jsonProps = null), (this.easeFunction = null), (this.animValues = null);
            }
            remove() {
                return this.controller.removeKeyframe(this);
            }
            parseOptions(e) {
                (this.jsonProps = e),
                    e.relativeTo && console.error(`KeyframeError: relativeTo has been removed. Use 'anchors' property instead. Found 'relativeTo':"${e.relativeTo}"`),
                    void 0 === e.end && void 0 === e.duration && (e.end = e.start),
                    "" !== e.anchors && e.anchors
                        ? ((this.anchors = []),
                          (e.anchors = Array.isArray(e.anchors) ? e.anchors : [e.anchors]),
                          e.anchors.forEach((t, i) => {
                              let s = u(t, this.controller.group.element);
                              if (!s) {
                                  let s = "";
                                  return (
                                      "string" == typeof t &&
                                          (s = " Provided value was a string, so a failed attempt was made to find anchor with the provided querystring in group.element, or in the document."),
                                      void console.warn(
                                          "Keyframe on",
                                          this.controller.element,
                                          ` failed to find anchor at index ${i} in array`,
                                          e.anchors,
                                          `. Anchors must be JS Object references, Elements references, or valid query selector strings. ${s}`
                                      )
                                  );
                              }
                              this.anchors.push(s), this.controller.group.metrics.add(s);
                          }))
                        : ((this.anchors = []), (e.anchors = [])),
                    e.ease ? (this.ease = parseFloat(e.ease)) : (e.ease = this.ease),
                    e.hasOwnProperty("snapAtCreation") ? (this.snapAtCreation = e.snapAtCreation) : (e.snapAtCreation = this.snapAtCreation),
                    e.easeFunction || (e.easeFunction = s.KeyframeDefaults.easeFunctionString),
                    e.breakpointMask ? (this.breakpointMask = e.breakpointMask) : (e.breakpointMask = this.breakpointMask),
                    e.disabledWhen ? (this.disabledWhen = Array.isArray(e.disabledWhen) ? e.disabledWhen : [e.disabledWhen]) : (e.disabledWhen = this.disabledWhen),
                    e.hasOwnProperty("hold") ? (this.hold = e.hold) : (e.hold = this.hold),
                    e.hasOwnProperty("preserveState") ? (this.preserveState = e.preserveState) : (e.preserveState = s.KeyframeDefaults.preserveState),
                    (this.easeFunction = a[e.easeFunction]),
                    a.hasOwnProperty(e.easeFunction) ||
                        (e.easeFunction.includes("bezier")
                            ? (this.easeFunction = l.fromCSSString(e.easeFunction))
                            : e.easeFunction.includes("spring")
                            ? (this.easeFunction = h.fromCSSString(e.easeFunction))
                            : console.error("Keyframe parseOptions cannot find 'easeFunction' named '" + e.easeFunction + "'"));
                for (let t in e) {
                    if (-1 !== s.KeyframeJSONReservedWords.indexOf(t)) continue;
                    let i = e[t];
                    if (Array.isArray(i)) {
                        if ((1 === i.length && ((i[1] = i[0]), (i[0] = null)), void 0 === this.controller.tweenProps[t] || !this.controller._ownerIsElement)) {
                            let o = 0;
                            this.controller._ownerIsElement || (o = this.controller.element[t] || 0);
                            const a = t.startsWith("--");
                            let l = i[2] || (a || f.includes(t) ? void 0 : "px"),
                                h = this.controller.group.anim.plugins.keyframe.reduce((i, s) => i || s.parseProp.call(this, e, t), null);
                            if (!h && this.controller._ownerIsElement)
                                if (a || p.includes(t)) {
                                    let i = d(t),
                                        n = e.round || ["zIndex"].includes(i);
                                    (o = parseFloat(this.controller.getTargetComputedStyle().getPropertyValue(i))),
                                        isNaN(o) && (o = 0),
                                        (h = new r(o, s.KeyframeDefaults.epsilon, this.snapAtCreation, t, n, l)),
                                        this.controller.cssAttributes.push(h);
                                } else _.includes(t) && ((h = new n(o, s.KeyframeDefaults.epsilon, this.snapAtCreation, t, e.round, l)), this.controller.domAttributes.push(h));
                            h || (h = new n(o, s.KeyframeDefaults.epsilon, this.snapAtCreation, t, e.round, l)), (this.controller.tweenProps[t] = h);
                        }
                        (this.animValues[t] = this.controller.group.expressionParser.parseArray(this, i)), this.controller.tweenProps[t].calculateEpsilon(e, this.animValues[t]);
                    }
                }
                (this.keyframeType = this.hold ? s.KeyframeTypes.InterpolationForward : s.KeyframeTypes.Interpolation), e.event && (this.event = e.event);
            }
            overwriteProps(e) {
                this.animValues = {};
                let t = Object.assign({}, this.jsonProps, e);
                this.controller.updateKeyframe(this, t);
            }
            updateLocalProgress(e) {
                if (this.start === this.end || e < this.start || e > this.end)
                    return (this.localT = e < this.start ? (this.hold ? this.localT : 0) : e > this.end ? 1 : 0), void (this.curvedT = this.easeFunction(this.localT));
                const t = (e - this.start) / (this.end - this.start),
                    i = this.hold ? this.localT : 0;
                (this.localT = o.clamp(t, i, 1)), (this.curvedT = this.easeFunction(this.localT));
            }
            reconcile(e) {
                this.controller.tweenProps[e].reconcile(this.animValues[e], this.curvedT) &&
                    (this.needsEventDispatch || ((this.needsEventDispatch = !0), this.controller.keyframesRequiringDispatch.push(this)));
            }
            reset(e) {
                this.localT = e || 0;
                let t = this.ease;
                this.ease = 1;
                for (let e in this.animValues) this.reconcile(e);
                this.ease = t;
            }
            onDOMRead(e) {
                let t = this.controller.tweenProps[e].update(this.animValues[e], this.curvedT, this.ease);
                return "" === this.event || this.needsEventDispatch || (t && ((this.needsEventDispatch = !0), this.controller.keyframesRequiringDispatch.push(this))), t;
            }
            isInRange(e) {
                return e >= this.start && e <= this.end;
            }
            setEnabled(e) {
                e = e || c(Array.from(document.documentElement.classList));
                let t = -1 !== this.breakpointMask.indexOf(s.pageMetrics.breakpoint),
                    i = !1;
                return this.disabledWhen.length > 0 && (i = this.disabledWhen.some((t) => void 0 !== e[t])), (this.isEnabled = t && !i), this.isEnabled;
            }
            evaluateConstraints() {
                (this.start = this.controller.group.expressionParser.parseTimeValue(this, this.jsonProps.start)),
                    (this.end = this.controller.group.expressionParser.parseTimeValue(this, this.jsonProps.end)),
                    this.evaluateInterpolationConstraints();
            }
            evaluateInterpolationConstraints() {
                for (let e in this.animValues) {
                    let t = this.jsonProps[e];
                    this.animValues[e] = this.controller.group.expressionParser.parseArray(this, t);
                }
            }
        }
        (g.DATA_ATTRIBUTE = "data-anim-tween"), (e.exports = g);
    },
    function (e, t, i) {
        "use strict";
        var s = i(45),
            n = function () {
                this.focusableSelectors = s.selectors;
            },
            r = n.prototype;
        (r.isFocusableElement = function (e, t, i) {
            return !(t && !this._isDisplayed(e)) && (s.nodeName[e.nodeName] ? !e.disabled : !e.contentEditable || ((i = i || parseFloat(e.getAttribute("tabindex"))), !isNaN(i)));
        }),
            (r.isTabbableElement = function (e, t) {
                if (t && !this._isDisplayed(e)) return !1;
                var i = e.getAttribute("tabindex");
                return (i = parseFloat(i)), isNaN(i) ? this.isFocusableElement(e, t, i) : i >= 0;
            }),
            (r._isDisplayed = function (e) {
                var t = e.getBoundingClientRect();
                return (0 !== t.top || 0 !== t.left || 0 !== t.width || 0 !== t.height) && "hidden" !== window.getComputedStyle(e).visibility;
            }),
            (r.getTabbableElements = function (e, t) {
                for (var i = e.querySelectorAll(this.focusableSelectors), s = i.length, n = [], r = 0; r < s; r++) this.isTabbableElement(i[r], t) && n.push(i[r]);
                return n;
            }),
            (r.getFocusableElements = function (e, t) {
                for (var i = e.querySelectorAll(this.focusableSelectors), s = i.length, n = [], r = 0; r < s; r++) this.isFocusableElement(i[r], t) && n.push(i[r]);
                return n;
            }),
            (e.exports = new n());
    },
    function (e, t, i) {
        "use strict";
        var s = i(9);
        e.exports = s.requestAnimationFrame("update");
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        t.default = {
            MOUNTED: "MOUNTED",
            MEDIA_LOAD_START: "MEDIA_LOAD_START",
            MEDIA_LOAD_COMPLETE: "MEDIA_LOAD_COMPLETE",
            MEDIA_LOAD_ERROR: "MEDIA_LOAD_ERROR",
            PLAYBACK_STATE_CHANGE: "PLAYBACK_STATE_CHANGE",
            LOADING_STATE_CHANGE: "LOADING_STATE_CHANGE",
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = function (e) {
            return e.reduce((e, t) => ((e[t] = t), e), {});
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(13),
            n = i(1),
            r = i(4);
        class o extends s {
            constructor(e, t) {
                super(e, t),
                    (this.keyframeType = n.KeyframeTypes.CSSClass),
                    (this._triggerType = o.TRIGGER_TYPE_CSS_CLASS),
                    (this.cssClass = ""),
                    (this.friendlyName = ""),
                    (this.style = { on: null, off: null }),
                    (this.toggle = n.KeyframeDefaults.toggle),
                    (this.isApplied = !1);
            }
            parseOptions(e) {
                if (!this.controller._ownerIsElement) throw new TypeError("CSS Keyframes cannot be applied to JS Objects");
                if (
                    ((e.x = void 0),
                    (e.y = void 0),
                    (e.z = void 0),
                    (e.scale = void 0),
                    (e.scaleX = void 0),
                    (e.scaleY = void 0),
                    (e.rotationX = void 0),
                    (e.rotationY = void 0),
                    (e.rotationZ = void 0),
                    (e.rotation = void 0),
                    (e.opacity = void 0),
                    (e.hold = void 0),
                    void 0 !== e.toggle && (this.toggle = e.toggle),
                    void 0 !== e.cssClass)
                )
                    (this._triggerType = o.TRIGGER_TYPE_CSS_CLASS),
                        (this.cssClass = e.cssClass),
                        (this.friendlyName = "." + this.cssClass),
                        void 0 === this.controller.tweenProps.targetClasses && (this.controller.tweenProps.targetClasses = { add: [], remove: [] });
                else {
                    if (void 0 === e.style || !this.isValidStyleProperty(e.style))
                        throw new TypeError("KeyframeCSSClass no 'cssClass` property found. If using `style` property its also missing or invalid");
                    if (
                        ((this._triggerType = o.TRIGGER_TYPE_STYLE_PROPERTY),
                        (this.style = e.style),
                        (this.friendlyName = "style"),
                        (this.toggle = void 0 !== this.style.off || this.toggle),
                        this.toggle && void 0 === this.style.off)
                    ) {
                        this.style.off = {};
                        for (let e in this.style.on) this.style.off[e] = "";
                    }
                    void 0 === this.controller.tweenProps.targetStyles && (this.controller.tweenProps.targetStyles = {});
                }
                if ((void 0 === e.end && (e.end = e.start), (e.toggle = this.toggle), this._triggerType === o.TRIGGER_TYPE_CSS_CLASS))
                    this.isApplied = this.controller.element.classList.contains(this.cssClass);
                else {
                    let e = getComputedStyle(this.controller.element);
                    this.isApplied = !0;
                    for (let t in this.style.on)
                        if (e[t] !== this.style.on[t]) {
                            this.isApplied = !1;
                            break;
                        }
                }
                s.prototype.parseOptions.call(this, e),
                    (this.animValues[this.friendlyName] = [0, 0]),
                    void 0 === this.controller.tweenProps[this.friendlyName] && (this.controller.tweenProps[this.friendlyName] = new r(0, 1, !1, this.friendlyName)),
                    (this.keyframeType = n.KeyframeTypes.CSSClass);
            }
            updateLocalProgress(e) {
                (this.isApplied && !this.toggle) ||
                    (this.start !== this.end
                        ? !this.isApplied && e >= this.start && e <= this.end
                            ? this._apply()
                            : this.isApplied && this.toggle && (e < this.start || e > this.end) && this._unapply()
                        : !this.isApplied && e >= this.start
                        ? this._apply()
                        : this.isApplied && this.toggle && e < this.start && this._unapply());
            }
            _apply() {
                if (this._triggerType === o.TRIGGER_TYPE_CSS_CLASS) this.controller.tweenProps.targetClasses.add.push(this.cssClass), (this.controller.needsClassUpdate = !0);
                else {
                    for (let e in this.style.on) this.controller.tweenProps.targetStyles[e] = this.style.on[e];
                    this.controller.needsStyleUpdate = !0;
                }
                this.isApplied = !0;
            }
            _unapply() {
                if (this._triggerType === o.TRIGGER_TYPE_CSS_CLASS) this.controller.tweenProps.targetClasses.remove.push(this.cssClass), (this.controller.needsClassUpdate = !0);
                else {
                    for (let e in this.style.off) this.controller.tweenProps.targetStyles[e] = this.style.off[e];
                    this.controller.needsStyleUpdate = !0;
                }
                this.isApplied = !1;
            }
            isValidStyleProperty(e) {
                if (!e.hasOwnProperty("on")) return !1;
                if ("object" != typeof e.on) throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}");
                if (this.toggle && e.hasOwnProperty("off") && "object" != typeof e.off)
                    throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}");
                return !0;
            }
            reconcile(e) {}
            onDOMRead(e) {}
            evaluateInterpolationConstraints() {}
        }
        (o.TRIGGER_TYPE_CSS_CLASS = 0), (o.TRIGGER_TYPE_STYLE_PROPERTY = 1), (o.DATA_ATTRIBUTE = "data-anim-classname"), (e.exports = o);
    },
    function (e, t, i) {
        "use strict";
        const s = i(3).EventEmitterMicro,
            n = i(5),
            r = i(17),
            o = i(1),
            a = i(33),
            l = i(67),
            h = i(68),
            c = i(34),
            u = i(69),
            d = i(71),
            m = {};
        "undefined" != typeof window && ((m.create = i(10)), (m.update = i(15)), (m.draw = i(11)));
        let p = 0;
        e.exports = class extends s {
            constructor(e, t) {
                super(),
                    (this.anim = t),
                    (this.element = e),
                    (this.name = this.name || e.getAttribute("data-anim-scroll-group")),
                    (this.isEnabled = !0),
                    (this.position = new l()),
                    (this.metrics = new c()),
                    this.metrics.add(this.element),
                    (this.expressionParser = new u(this)),
                    (this.boundsMin = 0),
                    (this.boundsMax = 0),
                    (this.timelineUpdateRequired = !1),
                    (this._keyframesDirty = !1),
                    (this.viewableRange = this.createViewableRange()),
                    (this.defaultEase = o.KeyframeDefaults.ease),
                    (this.keyframeControllers = []),
                    this.updateProgress(this.getPosition()),
                    (this.onDOMRead = this.onDOMRead.bind(this)),
                    (this.onDOMWrite = this.onDOMWrite.bind(this)),
                    (this.gui = null),
                    (this.computedStyleCache = {}),
                    this.finalizeInit();
            }
            finalizeInit() {
                (this.element._animInfo = new a(this, null, !0)), this.setupRAFEmitter();
            }
            destroy() {
                (this.destroyed = !0), this.expressionParser.destroy(), (this.expressionParser = null);
                for (let e = 0, t = this.keyframeControllers.length; e < t; e++) this.keyframeControllers[e].destroy();
                (this.keyframeControllers = null),
                    (this.position = null),
                    (this.viewableRange = null),
                    this.gui && (this.gui.destroy(), (this.gui = null)),
                    this.metrics.destroy(),
                    (this.metrics = null),
                    this.rafEmitter.destroy(),
                    (this.rafEmitter = null),
                    (this.anim = null),
                    this.element._animInfo && this.element._animInfo.group === this && ((this.element._animInfo.group = null), (this.element._animInfo = null)),
                    (this.element = null),
                    (this.isEnabled = !1),
                    super.destroy();
            }
            removeKeyframeController(e) {
                return this.keyframeControllers.includes(e)
                    ? (e._allKeyframes.forEach((e) => (e.markedForRemoval = !0)),
                      (this.keyframesDirty = !0),
                      new Promise((t) => {
                          m.draw(() => {
                              const i = this.keyframeControllers.indexOf(e);
                              -1 !== i ? (this.keyframeControllers.splice(i, 1), e.onDOMWrite(), e.destroy(), this.gui && this.gui.create(), t()) : t();
                          });
                      }))
                    : Promise.resolve();
            }
            remove() {
                return this.anim.removeGroup(this);
            }
            clear() {
                return Promise.all(this.keyframeControllers.map((e) => this.removeKeyframeController(e)));
            }
            setupRAFEmitter(e) {
                this.rafEmitter && this.rafEmitter.destroy(),
                    (this.rafEmitter = e || new m.create()),
                    this.rafEmitter.on("update", this.onDOMRead),
                    this.rafEmitter.on("draw", this.onDOMWrite),
                    this.rafEmitter.once("external", () => this.reconcile());
            }
            requestDOMChange() {
                return !!this.isEnabled && this.rafEmitter.run();
            }
            onDOMRead() {
                this.keyframesDirty && this.onKeyframesDirty();
                for (let e = 0, t = this.keyframeControllers.length; e < t; e++) this.keyframeControllers[e].onDOMRead(this.position.local);
            }
            onDOMWrite() {
                for (let e = 0, t = this.keyframeControllers.length; e < t; e++) this.keyframeControllers[e].onDOMWrite();
                this.needsUpdate() && this.requestDOMChange(), (this.computedStyleCache = {});
            }
            needsUpdate() {
                if (this._keyframesDirty) return !0;
                for (let e = 0, t = this.keyframeControllers.length; e < t; e++) if (this.keyframeControllers[e].needsUpdate()) return !0;
                return !1;
            }
            addKeyframe(e, t) {
                let i = this.getControllerForTarget(e);
                return null === i && ((i = new d(this, e)), this.keyframeControllers.push(i)), (this.keyframesDirty = !0), i.addKeyframe(t);
            }
            addEvent(e, t) {
                t.event = t.event || "Generic-Event-Name-" + p++;
                let i = void 0 !== t.end && t.end !== t.start;
                const s = this.addKeyframe(e, t);
                return (
                    i
                        ? (t.onEnterOnce && s.controller.once(t.event + ":enter", t.onEnterOnce),
                          t.onExitOnce && s.controller.once(t.event + ":exit", t.onExitOnce),
                          t.onEnter && s.controller.on(t.event + ":enter", t.onEnter),
                          t.onExit && s.controller.on(t.event + ":exit", t.onExit))
                        : (t.onEventOnce && s.controller.once(t.event, t.onEventOnce),
                          t.onEventReverseOnce && s.controller.once(t.event + ":reverse", t.onEventReverseOnce),
                          t.onEvent && s.controller.on(t.event, t.onEvent),
                          t.onEventReverse && s.controller.on(t.event + ":reverse", t.onEventReverse)),
                    s
                );
            }
            forceUpdate() {
                let { waitForNextUpdate: e = !0, silent: t = !1 } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.isEnabled && (this.refreshMetrics(), (this.timelineUpdateRequired = !0), e ? (this.keyframesDirty = !0) : this.onKeyframesDirty({ silent: t }));
            }
            onKeyframesDirty() {
                let { silent: e = !1 } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.determineActiveKeyframes(), (this.keyframesDirty = !1), this.metrics.refreshMetrics(this.element), (this.viewableRange = this.createViewableRange());
                for (let e = 0, t = this.keyframeControllers.length; e < t; e++) this.keyframeControllers[e].updateAnimationConstraints();
                this.updateBounds(), this.updateProgress(this.getPosition()), e || this.updateTimeline(), this.gui && this.gui.create();
            }
            refreshMetrics() {
                let e = new Set([this.element]);
                this.keyframeControllers.forEach((t) => {
                    e.add(t.element), t._allKeyframes.forEach((t) => t.anchors.forEach((t) => e.add(t)));
                }),
                    this.metrics.refreshCollection(e),
                    (this.viewableRange = this.createViewableRange());
            }
            reconcile() {
                for (let e = 0, t = this.keyframeControllers.length; e < t; e++) this.keyframeControllers[e].reconcile();
            }
            determineActiveKeyframes(e) {
                e = e || r(Array.from(document.documentElement.classList));
                for (let t = 0, i = this.keyframeControllers.length; t < i; t++) this.keyframeControllers[t].determineActiveKeyframes(e);
            }
            updateBounds() {
                if (0 === this.keyframeControllers.length) return (this.boundsMin = 0), void (this.boundsMax = 0);
                let e = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY };
                for (let t = 0, i = this.keyframeControllers.length; t < i; t++) this.keyframeControllers[t].getBounds(e);
                let t = this.convertTValueToScrollPosition(e.min),
                    i = this.convertTValueToScrollPosition(e.max);
                i - t < o.pageMetrics.windowHeight
                    ? ((e.min = this.convertScrollPositionToTValue(t - 0.5 * o.pageMetrics.windowHeight)), (e.max = this.convertScrollPositionToTValue(i + 0.5 * o.pageMetrics.windowHeight)))
                    : ((e.min -= 0.001), (e.max += 0.001)),
                    (this.boundsMin = e.min),
                    (this.boundsMax = e.max),
                    (this.timelineUpdateRequired = !0);
            }
            createViewableRange() {
                return new h(this.metrics.get(this.element), o.pageMetrics.windowHeight);
            }
            _onBreakpointChange(e, t) {
                (this.keyframesDirty = !0), this.determineActiveKeyframes();
            }
            updateProgress(e) {
                this.hasDuration()
                    ? ((this.position.localUnclamped = (e - this.viewableRange.a) / (this.viewableRange.d - this.viewableRange.a)),
                      (this.position.local = n.clamp(this.position.localUnclamped, this.boundsMin, this.boundsMax)))
                    : (this.position.local = this.position.localUnclamped = 0);
            }
            performTimelineDispatch() {
                for (let e = 0, t = this.keyframeControllers.length; e < t; e++) this.keyframeControllers[e].updateLocalProgress(this.position.local);
                this.trigger(o.EVENTS.ON_TIMELINE_UPDATE, this.position.local),
                    this.trigger("update", this.position.local),
                    (this.timelineUpdateRequired = !1),
                    this.position.lastPosition !== this.position.local &&
                        (this.position.lastPosition <= this.boundsMin && this.position.localUnclamped > this.boundsMin
                            ? (this.trigger(o.EVENTS.ON_TIMELINE_START, this), this.trigger("start", this))
                            : this.position.lastPosition >= this.boundsMin && this.position.localUnclamped < this.boundsMin
                            ? (this.trigger(o.EVENTS.ON_TIMELINE_START + ":reverse", this), this.trigger("start:reverse", this))
                            : this.position.lastPosition <= this.boundsMax && this.position.localUnclamped >= this.boundsMax
                            ? (this.trigger(o.EVENTS.ON_TIMELINE_COMPLETE, this), this.trigger("complete", this))
                            : this.position.lastPosition >= this.boundsMax &&
                              this.position.localUnclamped < this.boundsMax &&
                              (this.trigger(o.EVENTS.ON_TIMELINE_COMPLETE + ":reverse", this), this.trigger("complete:reverse", this))),
                    null !== this.gui && this.gui.onScrollUpdate(this.position);
            }
            updateTimeline(e) {
                if (!this.isEnabled) return !1;
                void 0 === e && (e = this.getPosition()), this.updateProgress(e);
                let t = this.position.lastPosition === this.boundsMin || this.position.lastPosition === this.boundsMax,
                    i = this.position.localUnclamped === this.boundsMin || this.position.localUnclamped === this.boundsMax;
                if (!this.timelineUpdateRequired && t && i && this.position.lastPosition === e) return void (this.position.local = this.position.localUnclamped);
                if (this.timelineUpdateRequired || (this.position.localUnclamped > this.boundsMin && this.position.localUnclamped < this.boundsMax))
                    return this.performTimelineDispatch(), this.requestDOMChange(), void (this.position.lastPosition = this.position.localUnclamped);
                let s = this.position.lastPosition > this.boundsMin && this.position.lastPosition < this.boundsMax,
                    n = this.position.localUnclamped <= this.boundsMin || this.position.localUnclamped >= this.boundsMax;
                if (s && n) return this.performTimelineDispatch(), this.requestDOMChange(), void (this.position.lastPosition = this.position.localUnclamped);
                const r = this.position.lastPosition < this.boundsMin && this.position.localUnclamped > this.boundsMax,
                    o = this.position.lastPosition > this.boundsMax && this.position.localUnclamped < this.boundsMax;
                (r || o) && (this.performTimelineDispatch(), this.requestDOMChange(), (this.position.lastPosition = this.position.localUnclamped)),
                    null !== this.gui && this.gui.onScrollUpdate(this.position);
            }
            _onScroll(e) {
                this.updateTimeline(e);
            }
            convertScrollPositionToTValue(e) {
                return this.hasDuration() ? n.map(e, this.viewableRange.a, this.viewableRange.d, 0, 1) : 0;
            }
            convertTValueToScrollPosition(e) {
                return this.hasDuration() ? n.map(e, 0, 1, this.viewableRange.a, this.viewableRange.d) : 0;
            }
            hasDuration() {
                return this.viewableRange.a !== this.viewableRange.d;
            }
            getPosition() {
                return o.pageMetrics.scrollY;
            }
            getControllerForTarget(e) {
                if (!e._animInfo || !e._animInfo.controllers) return null;
                if (e._animInfo.controller && e._animInfo.controller.group === this) return e._animInfo.controller;
                const t = e._animInfo.controllers;
                for (let e = 0, i = t.length; e < i; e++) if (t[e].group === this) return t[e];
                return null;
            }
            trigger(e, t) {
                if (void 0 !== this._events[e]) for (let i = this._events[e].length - 1; i >= 0; i--) void 0 !== t ? this._events[e][i](t) : this._events[e][i]();
            }
            set keyframesDirty(e) {
                (this._keyframesDirty = e), this._keyframesDirty && this.requestDOMChange();
            }
            get keyframesDirty() {
                return this._keyframesDirty;
            }
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = { SharedInstance: i(78) };
    },
    function (e, t, i) {
        "use strict";
        const s = i(25),
            n = i(26);
        e.exports = { PictureLazyLoading: s, PictureHead: n };
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            ALERT: "alert",
            ALERTDIALOG: "alertdialog",
            BUTTON: "button",
            CHECKBOX: "checkbox",
            DIALOG: "dialog",
            GRIDCELL: "gridcell",
            LINK: "link",
            LOG: "log",
            MARQUEE: "marquee",
            MENUITEM: "menuitem",
            MENUITEMCHECKBOX: "menuitemcheckbox",
            MENUITEMRADIO: "menuitemradio",
            OPTION: "option",
            PROGRESSBAR: "progressbar",
            RADIO: "radio",
            SCROLLBAR: "scrollbar",
            SLIDER: "slider",
            SPINBUTTON: "spinbutton",
            STATUS: "status",
            SWITCH: "switch",
            TAB: "tab",
            TABPANEL: "tabpanel",
            TEXTBOX: "textbox",
            TIMER: "timer",
            TOOLTIP: "tooltip",
            TREEITEM: "treeitem",
            COMBOBOX: "combobox",
            GRID: "grid",
            LISTBOX: "listbox",
            MENU: "menu",
            MENUBAR: "menubar",
            RADIOGROUP: "radiogroup",
            TABLIST: "tablist",
            TREE: "tree",
            TREEGRID: "treegrid",
            ARTICLE: "article",
            COLUMNHEADER: "columnheader",
            DEFINITION: "definition",
            DIRECTORY: "directory",
            DOCUMENT: "document",
            GROUP: "group",
            HEADING: "heading",
            IMG: "img",
            LIST: "list",
            LISTITEM: "listitem",
            MATH: "math",
            NOTE: "note",
            PRESENTATION: "presentation",
            REGION: "region",
            ROW: "row",
            ROWGROUP: "rowgroup",
            ROWHEADER: "rowheader",
            SEPARATOR: "separator",
            TOOLBAR: "toolbar",
            APPLICATION: "application",
            BANNER: "banner",
            COMPLEMENTARY: "complementary",
            CONTENTINFO: "contentinfo",
            FORM: "form",
            MAIN: "main",
            NAVIGATION: "navigation",
            SEARCH: "search",
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(14);
        let n = (e) => {
            s.isTabbableElement(e) || e.setAttribute("tabindex", "0");
        };
        e.exports = function (e) {
            e instanceof Node
                ? n(e)
                : e.forEach((e) => {
                      n(e);
                  });
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(40);
        e.exports = function (e) {
            s(e, "tabindex", "-1");
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(2).PICTURE_DATA_LAZY,
            n = i(2).PICTURE_DATA_EMPTY_SOURCE,
            r = i(2).PICTURE_DATA_DOWNLOAD_AREA_KEYFRAME;
        e.exports = class {
            constructor() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                (this.options = e), this._init();
            }
            _init() {
                (this._pictures = Array.from(document.querySelectorAll(`*[${s}]`))),
                    (this.AnimSystem = this._findAnim()),
                    null !== this.AnimSystem && (this._injectSources(), this._addKeyframesToImages(), this._addMethodsToPictures());
            }
            _addMethodsToPictures() {
                this._pictures.forEach((e) => {
                    e.forceLoad = () => {
                        this._downloadImage(e);
                    };
                });
            }
            _injectSources() {
                this._pictures.forEach((e) => {
                    const t = e.nextElementSibling;
                    if (t && "NOSCRIPT" === t.nodeName) {
                        const i = e.querySelector("img"),
                            s = t.textContent.match(/<source .+ \/>/g);
                        s && i.insertAdjacentHTML("beforebegin", s.join(""));
                    }
                });
            }
            _defineKeyframeOptions(e) {
                const t = e.getAttribute(r) || "{}";
                return Object.assign({}, { start: "t - 200vh", end: "b + 100vh", event: "PictureLazyLoading" }, JSON.parse(t));
            }
            _addKeyframesToImages() {
                this._pictures.forEach((e) => {
                    (e.__scrollGroup = this.AnimSystem.getGroupForTarget(document.body)), this.AnimSystem.getGroupForTarget(e) && (e.__scrollGroup = this.AnimSystem.getGroupForTarget(e));
                    let t = this._defineKeyframeOptions(e);
                    e.__scrollGroup.addKeyframe(e, t).controller.once("PictureLazyLoading:enter", () => {
                        this._imageIsInLoadRange(e);
                    });
                });
            }
            _imageIsInLoadRange(e) {
                e.querySelector("img") && this._downloadImage(e);
            }
            _downloadImage(e) {
                const t = e.querySelector(`[${n}]`);
                t && e.removeChild(t);
            }
            _findAnim() {
                var e = Array.from(document.querySelectorAll("[data-anim-group],[data-anim-scroll-group],[data-anim-time-group]"));
                return (
                    e.map((e) => (e._animInfo ? e._animInfo.group : null)).filter((e) => null !== e),
                    e[0] && e[0]._animInfo ? e[0]._animInfo.group.anim : (console.error("PictureLazyLoading: AnimSystem not found, please initialize anim before instantiating"), null)
                );
            }
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(2).PICTURE_CLASS_LOADED,
            n = i(2).PICTURE_DATA_LOADED,
            r = i(2).PICTURE_DATA_EMPTY_SOURCE;
        e.exports =
            ((window.__pictureElementInstancesLoaded = new Map()),
            void (window.__lp = function (e) {
                const t = e.target.parentElement;
                t.querySelector(`[${r}]`)
                    ? e.stopImmediatePropagation()
                    : (t.classList.add(`${s}`), t.setAttribute(`${n}`, ""), window.__pictureElementInstancesLoaded.set(t.id, t), (e.target.onload = null));
            }));
    },
    function (e, t, i) {
        "use strict";
        e.exports = class {};
    },
    function (e, t, i) {
        "use strict";
        const s = i(4),
            n = i(29);
        e.exports = class extends s {
            constructor(e, t, i, s) {
                let r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                    o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : void 0;
                super(e, t, i, (s = n(s)), r, o);
            }
            set(e) {
                let t = this.current;
                this.round && (t = Math.round(t)), this.suffix && (t += this.suffix), e.setProperty(this.key, t);
            }
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = function (e) {
            return e.startsWith("--") ? e : e.replace(/[A-Z]/g, (e) => "-" + e.toLowerCase());
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = () => Math.random().toString(16).slice(-4);
    },
    function (e, t, i) {
        "use strict";
        let s = [
            "borderRadius",
            "bottom",
            "fontSize",
            "fontWeight",
            "height",
            "left",
            "lineHeight",
            "marginBottom",
            "marginLeft",
            "marginRight",
            "marginTop",
            "maxHeight",
            "maxWidth",
            "opacity",
            "paddingBottom",
            "paddingLeft",
            "paddingRight",
            "paddingTop",
            "right",
            "top",
            "width",
            "zIndex",
            "strokeDashoffset",
        ];
        s.push(...s.map((e) => e.replace(/[A-Z]/g, (e) => "-" + e.toLowerCase())));
        e.exports = {
            transformAttributes: ["x", "y", "z", "scale", "scaleX", "scaleY", "rotation", "rotationX", "rotationY", "rotationZ"],
            cssAttributes: s,
            domAttributes: ["scrollLeft", "scrollTop", "scrollBy", "scrollTo", "currentTime"],
            suffixFreeAttributes: ["opacity", "z-index", "font-weight", "zIndex", "fontWeight", "scrollLeft", "scrollTop", "scrollBy", "scrollTo", "currentTime"],
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(13),
            n = i(1),
            r = i(4);
        class o extends s {
            constructor(e, t) {
                super(e, t), (this.keyframeType = n.KeyframeTypes.Event), (this.isApplied = !1), (this.hasDuration = !1), (this.isCurrentlyInRange = !1);
            }
            parseOptions(e) {
                (e.x = void 0),
                    (e.y = void 0),
                    (e.scale = void 0),
                    (e.scaleX = void 0),
                    (e.scaleY = void 0),
                    (e.rotation = void 0),
                    (e.style = void 0),
                    (e.cssClass = void 0),
                    (e.rotation = void 0),
                    (e.opacity = void 0),
                    (e.hold = void 0),
                    (this.event = e.event),
                    (this.animValues[this.event] = [0, 0]),
                    void 0 === this.controller.tweenProps[this.event] && (this.controller.tweenProps[this.event] = new r(0, 1, !1, this.event)),
                    super.parseOptions(e),
                    (this.keyframeType = n.KeyframeTypes.Event);
            }
            updateLocalProgress(e) {
                if (this.hasDuration) {
                    let t = this.isCurrentlyInRange,
                        i = e >= this.start && e <= this.end;
                    if (t === i) return;
                    return (this.isCurrentlyInRange = i), void (i && !t ? this._trigger(this.event + ":enter") : t && !i && this._trigger(this.event + ":exit"));
                }
                !this.isApplied && e >= this.start
                    ? ((this.isApplied = !0), this._trigger(this.event))
                    : this.isApplied && e < this.start && ((this.isApplied = !1), this._trigger(this.event + ":reverse"));
            }
            _trigger(e) {
                (this.controller.eventObject.event = e), (this.controller.eventObject.keyframe = this), this.controller.trigger(e, this.controller.eventObject);
            }
            evaluateConstraints() {
                super.evaluateConstraints(), (this.hasDuration = this.start !== this.end);
            }
            reset(e) {
                (this.isApplied = !1), (this.isCurrentlyInRange = !1), super.reset(e);
            }
            onDOMRead(e) {}
            reconcile(e) {}
            evaluateInterpolationConstraints() {}
        }
        (o.DATA_ATTRIBUTE = "data-anim-event"), (e.exports = o);
    },
    function (e, t, i) {
        "use strict";
        const s = i(27);
        e.exports = class {
            constructor(e, t) {
                let i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                (this.isGroup = i), (this.group = e), (this.controller = t), (this.controllers = []), (this.tweenProps = new s());
            }
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(1),
            n = (e, t) => (null == e ? t : e);
        class r {
            constructor(e) {
                (this.top = 0), (this.bottom = 0), (this.left = 0), (this.right = 0), (this.height = 0), (this.width = 0);
            }
            toString() {
                return `top:${this.top}, bottom:${this.bottom}, left:${this.left}, right:${this.right}, height:${this.height}, width:${this.width}`;
            }
            toObject() {
                return { top: this.top, bottom: this.bottom, left: this.left, right: this.right, height: this.height, width: this.width };
            }
        }
        e.exports = class {
            constructor() {
                this.clear();
            }
            clear() {
                this._metrics = new WeakMap();
            }
            destroy() {
                this._metrics = null;
            }
            add(e) {
                let t = this._metrics.get(e);
                if (t) return t;
                let i = new r(e);
                return this._metrics.set(e, i), this._refreshMetrics(e, i);
            }
            get(e) {
                return this._metrics.get(e);
            }
            refreshCollection(e) {
                e.forEach((e) => this._refreshMetrics(e, null));
            }
            refreshMetrics(e) {
                return this._refreshMetrics(e);
            }
            _refreshMetrics(e, t) {
                if (((t = t || this._metrics.get(e)), !(e instanceof Element)))
                    return (
                        (t.width = n(e.width, 0)),
                        (t.height = n(e.height, 0)),
                        (t.top = n(e.top, n(e.y, 0))),
                        (t.left = n(e.left, n(e.x, 0))),
                        (t.right = t.left + t.width),
                        (t.bottom = t.top + t.height),
                        t
                    );
                if (void 0 === e.offsetWidth) {
                    let i = e.getBoundingClientRect();
                    return (
                        (t.width = i.width),
                        (t.height = i.height),
                        (t.top = s.pageMetrics.scrollY + i.top),
                        (t.left = s.pageMetrics.scrollX + i.left),
                        (t.right = t.left + t.width),
                        (t.bottom = t.top + t.height),
                        t
                    );
                }
                (t.width = e.offsetWidth), (t.height = e.offsetHeight), (t.top = s.pageMetrics.documentOffsetY), (t.left = s.pageMetrics.documentOffsetX);
                let i = e;
                for (; i; ) (t.top += i.offsetTop), (t.left += i.offsetLeft), (i = i.offsetParent);
                return (t.right = t.left + t.width), (t.bottom = t.top + t.height), t;
            }
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = { majorVersionNumber: "3.x" };
    },
    function (e, t, i) {
        "use strict";
        var s = i(9);
        e.exports = s.requestAnimationFrame("external");
    },
    function (e, t, i) {
        "use strict";
        const s = i(1);
        class n {
            constructor(e, t) {
                (this._index = 0), (this.keyframe = e), t && (this.name = t);
            }
            get start() {
                return this.keyframe.jsonProps.start;
            }
            set index(e) {
                this._index = e;
            }
            get index() {
                return this._index;
            }
        }
        e.exports = class {
            constructor(e) {
                (this.timeGroup = e), (this.chapters = []), (this.chapterNames = {}), (this.currentChapter = null), (this.tween = null);
            }
            addChapter(e) {
                const { position: t, name: i } = e;
                if (void 0 === t) throw ReferenceError("Cannot add chapter without target position.");
                e._impIsFirst || 0 !== this.chapters.length || this.addChapter({ position: 0, _impIsFirst: !0 });
                let s = this.timeGroup.addKeyframe(this, { start: t, end: t, event: "Chapter" });
                this.timeGroup.forceUpdate({ waitForNextFrame: !1, silent: !0 });
                const r = new n(s, i);
                if ((this.chapters.push(r), i)) {
                    if (this.chapterNames.hasOwnProperty(i)) throw ReferenceError(`Duplicate chapter name assigned - "${i}" is already in use`);
                    this.chapterNames[i] = r;
                }
                return this.chapters.sort((e, t) => e.start - t.start).forEach((e, t) => (e.index = t)), (this.currentChapter = this.currentChapter || this.chapters[0]), r;
            }
            playToChapter(e) {
                let t;
                if (e.hasOwnProperty("index")) t = this.chapters[e.index];
                else {
                    if (!e.hasOwnProperty("name")) throw ReferenceError("Cannot play to chapter without target index or name");
                    t = this.chapterNames[e.name];
                }
                if (!t || (this.currentChapter === t && !0 !== e.force)) return;
                let i = e.ease || "easeInOutCubic";
                this.tween && this.tween.controller && (this.tween.remove(), (i = "easeOutQuint")), this.timeGroup.timeScale(e.timeScale || 1);
                const n = void 0 !== e.duration ? e.duration : this.getDurationToChapter(t),
                    r = this.timeGroup.time(),
                    o = t.start;
                let a = !1;
                this.tween = this.timeGroup.anim.addTween(
                    { time: r },
                    {
                        easeFunction: i,
                        duration: n,
                        time: [r, o],
                        onStart: () => this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_INITIATED, { player: this, next: t }),
                        onDraw: (e) => {
                            let i = e.tweenProps.time.current;
                            this.timeGroup.time(i),
                                e.keyframe.curvedT > 0.5 &&
                                    !a &&
                                    ((a = !0), (this.currentIndex = t.index), (this.currentChapter = t), this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_OCCURRED, { player: this, current: t }));
                        },
                        onComplete: () => {
                            this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_COMPLETED, { player: this, current: t }), this.timeGroup.paused(!0), (this.tween = null);
                        },
                    }
                );
            }
            getDurationToChapter(e) {
                const t = this.chapters[e.index - 1] || this.chapters[e.index + 1];
                return Math.abs(t.start - e.start);
            }
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(7),
            n = i(14),
            r = "data-original-",
            o = "tabindex",
            a = function (e, t) {
                var i = e.getAttribute(r + t);
                i || ((i = e.getAttribute(t) || ""), e.setAttribute(r + t, i));
            };
        e.exports = function (e, t) {
            if (n.isFocusableElement(e, t)) a(e, o), e.setAttribute(o, "-1");
            else for (var i = n.getTabbableElements(e, t), r = i.length; r--; ) a(i[r], o), i[r].setAttribute(o, "-1");
            a(e, s.HIDDEN), e.setAttribute(s.HIDDEN, "true");
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(46),
            n = i(7),
            r = "data-original-",
            o = "tabindex",
            a = function (e, t) {
                var i = e.getAttribute(r + t);
                null !== i && ("" === i ? s(e, t) : e.setAttribute(t, i), s(e, r + t));
            };
        e.exports = function (e) {
            a(e, o), a(e, n.HIDDEN);
            for (var t = e.querySelectorAll(`[${r + o}]`), i = t.length; i--; ) a(t[i], o);
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = function (e, t, i) {
            let s;
            "string" != typeof i && (i = i.toString()),
                (s = e instanceof NodeList ? e : [].concat(e)),
                s.forEach((e) => {
                    e.setAttribute(t, i);
                });
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = function (e) {
            return "string" == typeof e ? "true" === (e = e.toLowerCase()) : e;
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = i(90);
    },
    function (e, t, i) {
        "use strict";
        const s = i(3).EventEmitterMicro,
            n = i(1),
            r = i(13),
            o = i(18),
            a = i(32),
            l = i(19),
            h = i(86),
            c = i(87),
            u = i(88),
            d = {};
        "undefined" != typeof window && ((d.update = i(15)), (d.cancelUpdate = i(89)), (d.external = i(36)), (d.draw = i(11)));
        let m = null;
        class p extends s {
            constructor() {
                if ((super(), m)) throw "You cannot create multiple AnimSystems. You probably want to create multiple groups instead. You can have unlimited groups on a page";
                (m = this),
                    (this.groups = []),
                    (this.scrollSystems = []),
                    (this.timeSystems = []),
                    (this.tweenGroup = null),
                    (this._forceUpdateRAFId = -1),
                    (this.initialized = !1),
                    (this.model = n),
                    (this.plugins = { keyframe: [], parser: [] }),
                    (this.version = u.version),
                    (this._resolveReady = () => {}),
                    (this.ready = new Promise((e) => (this._resolveReady = e))),
                    (this.onScroll = this.onScroll.bind(this)),
                    (this.onResizedDebounced = this.onResizedDebounced.bind(this)),
                    (this.onResizeImmediate = this.onResizeImmediate.bind(this));
            }
            initialize() {
                return (
                    this.initialized ||
                        "undefined" == typeof window ||
                        ((this.initialized = !0),
                        (this.timeSystems = []),
                        (this.scrollSystems = []),
                        (this.groups = []),
                        this.setupEvents(),
                        this.initializeResizeFilter(),
                        this.initializeModel(),
                        this.createDOMGroups(),
                        this.createDOMKeyframes(),
                        (this.tweenGroup = new c(null, this)),
                        this.groups.unshift(this.tweenGroup),
                        this._resolveReady()),
                    this.ready
                );
            }
            use(e, t) {
                e.install(this, t);
            }
            remove() {
                return this.initialized
                    ? Promise.all(this.groups.map((e) => e.remove())).then(() => {
                          (this.groups = null),
                              (this.scrollSystems = null),
                              (this.timeSystems = null),
                              window.clearTimeout(n.RESIZE_TIMEOUT),
                              window.removeEventListener("scroll", this.onScroll),
                              window.removeEventListener("resize", this.onResizeImmediate),
                              (this._events = {}),
                              (this.initialized = !1),
                              (this.ready = new Promise((e) => (this._resolveReady = e)));
                      })
                    : ((this.ready = new Promise((e) => (this._resolveReady = e))), Promise.resolve());
            }
            destroy() {
                return this.remove();
            }
            createTimeGroup(e, t) {
                e instanceof HTMLElement || (e = (t = e || {}).el);
                let i = new h(e, this);
                return t && t.name && (i.name = t.name), this.groups.push(i), this.timeSystems.push(i), this.trigger(n.EVENTS.ON_GROUP_CREATED, i), i;
            }
            createScrollGroup(e, t) {
                if (!e) throw "AnimSystem scroll based groups must supply an HTMLElement";
                let i = new l(e, this);
                return (
                    (t = t || {}).name && (i.name = t.name),
                    t.getPosition && t.getMaxPosition && ((i.getPosition = t.getPosition), (i.createViewableRange = () => ({ a: 0, d: t.getMaxPosition() }))),
                    (i.getPosition = t.getPosition || i.getPosition),
                    (i.getPosition = t.getPosition || i.getPosition),
                    this.groups.push(i),
                    this.scrollSystems.push(i),
                    this.trigger(n.EVENTS.ON_GROUP_CREATED, i),
                    i
                );
            }
            removeGroup(e) {
                return Promise.all(e.keyframeControllers.map((t) => e.removeKeyframeController(t))).then(() => {
                    let t = this.groups.indexOf(e);
                    -1 !== t && this.groups.splice(t, 1),
                        (t = this.scrollSystems.indexOf(e)),
                        -1 !== t && this.scrollSystems.splice(t, 1),
                        (t = this.timeSystems.indexOf(e)),
                        -1 !== t && this.timeSystems.splice(t, 1),
                        e.destroy();
                });
            }
            createDOMGroups() {
                document.body.setAttribute("data-anim-scroll-group", "body"),
                    document.querySelectorAll("[data-anim-scroll-group]").forEach((e) => this.createScrollGroup(e)),
                    document.querySelectorAll("[data-anim-time-group]").forEach((e) => this.createTimeGroup(e)),
                    this.trigger(n.EVENTS.ON_DOM_GROUPS_CREATED, this.groups);
            }
            createDOMKeyframes() {
                let e = [];
                ["data-anim-keyframe", r.DATA_ATTRIBUTE, o.DATA_ATTRIBUTE, a.DATA_ATTRIBUTE].forEach(function (t) {
                    for (let i = 0; i < 12; i++) e.push(t + (0 === i ? "" : "-" + (i - 1)));
                });
                for (let t = 0; t < e.length; t++) {
                    let i = e[t],
                        s = document.querySelectorAll("[" + i + "]");
                    for (let e = 0; e < s.length; e++) {
                        const t = s[e],
                            n = JSON.parse(t.getAttribute(i));
                        this.addKeyframe(t, n);
                    }
                }
                d.update(() => {
                    null !== this.groups &&
                        (this.groups.forEach((e) => e.onKeyframesDirty({ silent: !0 })),
                        this.groups.forEach((e) => e.trigger(n.EVENTS.ON_DOM_KEYFRAMES_CREATED, e)),
                        this.trigger(n.EVENTS.ON_DOM_KEYFRAMES_CREATED, this),
                        this.groups.forEach((e) => {
                            e.forceUpdate({ waitForNextUpdate: !1, silent: !0 }), e.reconcile();
                        }),
                        this.onScroll());
                }, !0);
            }
            initializeResizeFilter() {
                if (n.cssDimensionsTracker) return;
                const e = document.querySelector(".cssDimensionsTracker") || document.createElement("div");
                e.setAttribute("cssDimensionsTracker", "true"),
                    (e.style.position = "fixed"),
                    (e.style.top = "0"),
                    (e.style.width = "100%"),
                    (e.style.height = "100vh"),
                    (e.style.pointerEvents = "none"),
                    (e.style.visibility = "hidden"),
                    (e.style.zIndex = "-1"),
                    document.documentElement.appendChild(e),
                    (n.cssDimensionsTracker = e);
            }
            initializeModel() {
                (n.pageMetrics.windowHeight = n.cssDimensionsTracker.clientHeight),
                    (n.pageMetrics.windowWidth = n.cssDimensionsTracker.clientWidth),
                    (n.pageMetrics.scrollY = window.scrollY || window.pageYOffset),
                    (n.pageMetrics.scrollX = window.scrollX || window.pageXOffset),
                    (n.pageMetrics.breakpoint = n.getBreakpoint());
                let e = document.documentElement.getBoundingClientRect();
                (n.pageMetrics.documentOffsetX = e.left + n.pageMetrics.scrollX), (n.pageMetrics.documentOffsetY = e.top + n.pageMetrics.scrollY);
            }
            setupEvents() {
                window.removeEventListener("scroll", this.onScroll),
                    window.addEventListener("scroll", this.onScroll),
                    window.removeEventListener("resize", this.onResizeImmediate),
                    window.addEventListener("resize", this.onResizeImmediate);
            }
            onScroll() {
                (n.pageMetrics.scrollY = window.scrollY || window.pageYOffset), (n.pageMetrics.scrollX = window.scrollX || window.pageXOffset);
                for (let e = 0, t = this.scrollSystems.length; e < t; e++) this.scrollSystems[e].updateTimeline();
                this.trigger(n.PageEvents.ON_SCROLL, n.pageMetrics);
            }
            onResizeImmediate() {
                let e = n.cssDimensionsTracker.clientWidth,
                    t = n.cssDimensionsTracker.clientHeight;
                if (e === n.pageMetrics.windowWidth && t === n.pageMetrics.windowHeight) return;
                (n.pageMetrics.windowWidth = e),
                    (n.pageMetrics.windowHeight = t),
                    (n.pageMetrics.scrollY = window.scrollY || window.pageYOffset),
                    (n.pageMetrics.scrollX = window.scrollX || window.pageXOffset);
                let i = document.documentElement.getBoundingClientRect();
                (n.pageMetrics.documentOffsetX = i.left + n.pageMetrics.scrollX),
                    (n.pageMetrics.documentOffsetY = i.top + n.pageMetrics.scrollY),
                    window.clearTimeout(n.RESIZE_TIMEOUT),
                    (n.RESIZE_TIMEOUT = window.setTimeout(this.onResizedDebounced, 250)),
                    this.trigger(n.PageEvents.ON_RESIZE_IMMEDIATE, n.pageMetrics);
            }
            onResizedDebounced() {
                d.update(() => {
                    let e = n.pageMetrics.breakpoint,
                        t = n.getBreakpoint();
                    if (t !== e) {
                        (n.pageMetrics.previousBreakpoint = e), (n.pageMetrics.breakpoint = t);
                        for (let e = 0, t = this.groups.length; e < t; e++) this.groups[e]._onBreakpointChange();
                        this.trigger(n.PageEvents.ON_BREAKPOINT_CHANGE, n.pageMetrics);
                    }
                    for (let e = 0, t = this.groups.length; e < t; e++) this.groups[e].forceUpdate({ waitForNextUpdate: !1 });
                    this.trigger(n.PageEvents.ON_RESIZE_DEBOUNCED, n.pageMetrics);
                }, !0);
            }
            forceUpdate() {
                let { waitForNextUpdate: e = !0, silent: t = !1 } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                -1 !== this._forceUpdateRAFId && d.cancelUpdate(this._forceUpdateRAFId);
                let i = () => {
                    for (let e = 0, i = this.groups.length; e < i; e++) {
                        this.groups[e].forceUpdate({ waitForNextUpdate: !1, silent: t });
                    }
                    return -1;
                };
                this._forceUpdateRAFId = e ? d.update(i, !0) : i();
            }
            addKeyframe(e, t) {
                let i = this.getGroupForTarget(e);
                return (i = i || this.getGroupForTarget(document.body)), i.addKeyframe(e, t);
            }
            addEvent(e, t) {
                let i = this.getGroupForTarget(e);
                return (i = i || this.getGroupForTarget(document.body)), i.addEvent(e, t);
            }
            getTimeGroupForTarget(e) {
                return this._getGroupForTarget(e, (e) => e instanceof h);
            }
            getScrollGroupForTarget(e) {
                return this._getGroupForTarget(e, (e) => !(e instanceof h));
            }
            getGroupForTarget(e) {
                return this._getGroupForTarget(e, () => !0);
            }
            getGroupByName(e) {
                return this.groups.find((t) => t.name === e);
            }
            _getGroupForTarget(e, t) {
                if (e._animInfo && e._animInfo.group && t(e._animInfo.group)) return e._animInfo.group;
                let i = e;
                for (; i; ) {
                    if (i._animInfo && i._animInfo.isGroup && t(i._animInfo.group)) return i._animInfo.group;
                    i = i.parentElement;
                }
            }
            getControllerForTarget(e) {
                return e._animInfo && e._animInfo.controller ? e._animInfo.controller : null;
            }
            addTween(e, t) {
                return this.tweenGroup.addKeyframe(e, t);
            }
        }
        (e.exports = "undefined" == typeof window ? new p() : window.AC.SharedInstance.share("AnimSystem", u.major, p)), (e.exports.default = e.exports);
    },
    function (e, t, i) {
        "use strict";
        e.exports = new (class {
            constructor() {
                (this.linear = function (e) {
                    return e;
                }),
                    (this.easeInQuad = function (e) {
                        return e * e;
                    }),
                    (this.easeOutQuad = function (e) {
                        return e * (2 - e);
                    }),
                    (this.easeInOutQuad = function (e) {
                        return e < 0.5 ? 2 * e * e : (4 - 2 * e) * e - 1;
                    }),
                    (this.easeInSin = function (e) {
                        return 1 + Math.sin((Math.PI / 2) * e - Math.PI / 2);
                    }),
                    (this.easeOutSin = function (e) {
                        return Math.sin((Math.PI / 2) * e);
                    }),
                    (this.easeInOutSin = function (e) {
                        return (1 + Math.sin(Math.PI * e - Math.PI / 2)) / 2;
                    }),
                    (this.easeInElastic = function (e) {
                        return 0 === e ? e : (0.04 - 0.04 / e) * Math.sin(25 * e) + 1;
                    }),
                    (this.easeOutElastic = function (e) {
                        return ((0.04 * e) / --e) * Math.sin(25 * e);
                    }),
                    (this.easeInOutElastic = function (e) {
                        return (e -= 0.5) < 0 ? (0.02 + 0.01 / e) * Math.sin(50 * e) : (0.02 - 0.01 / e) * Math.sin(50 * e) + 1;
                    }),
                    (this.easeOutBack = function (e) {
                        return (e -= 1) * e * (2.70158 * e + 1.70158) + 1;
                    }),
                    (this.easeInCubic = function (e) {
                        return e * e * e;
                    }),
                    (this.easeOutCubic = function (e) {
                        return --e * e * e + 1;
                    }),
                    (this.easeInOutCubic = function (e) {
                        return e < 0.5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1;
                    }),
                    (this.easeInQuart = function (e) {
                        return e * e * e * e;
                    }),
                    (this.easeOutQuart = function (e) {
                        return 1 - --e * e * e * e;
                    }),
                    (this.easeInOutQuart = function (e) {
                        return e < 0.5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e;
                    }),
                    (this.easeInQuint = function (e) {
                        return e * e * e * e * e;
                    }),
                    (this.easeOutQuint = function (e) {
                        return 1 + --e * e * e * e * e;
                    }),
                    (this.easeInOutQuint = function (e) {
                        return e < 0.5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e;
                    });
            }
        })();
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            selectors: ["input", "select", "textarea", "button", "optgroup", "option", "menuitem", "fieldset", "object", "a[href]", "[tabindex]", "[contenteditable]"].join(","),
            nodeName: {
                INPUT: "input",
                SELECT: "select",
                TEXTAREA: "textarea",
                BUTTON: "button",
                OPTGROUP: "optgroup",
                OPTION: "option",
                MENUITEM: "menuitem",
                FIELDSET: "fieldset",
                OBJECT: "object",
                A: "a",
            },
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            let i;
            (i = e instanceof NodeList ? e : [].concat(e)),
                (t = Array.isArray(t) ? t : [].concat(t)),
                i.forEach((e) => {
                    t.forEach((t) => {
                        e.removeAttribute(t);
                    });
                });
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(7),
            n = i(22),
            r = i(23),
            o = i(24),
            a = i(41),
            l = i(48),
            h = l.prototype,
            c = function (e, t) {
                (t = t || {}), l.call(this, e, { selector: t.selector || "*[role=" + n.OPTION + "]", state: t.state || s.SELECTED });
            },
            u = (c.prototype = Object.create(h));
        (u._setTabbingByIndex = function (e) {
            var t = this._navItems[e];
            a(t.getAttribute(this._state)) ? ((this.focusedNavItemIndex = e), (this.selectedNavitemIndex = e), this._enableElement(t)) : this._disableElement(t);
        }),
            (u.setSelectedItemByIndex = function (e, t) {
                isNaN(this.selectedNavitemIndex) || this._disableElement(this._navItems[this.selectedNavitemIndex]),
                    h.setSelectedItemByIndex.call(this, e, t),
                    this._enableElement(this._navItems[this.selectedNavitemIndex]);
            }),
            (u.addNavItem = function (e) {
                e && e.nodeType && this._navItems.indexOf(e) < 0 && (a(e.getAttribute(s.DISABLED)) || this._disableElement(e), this._navItems.push(e));
            }),
            (u._arrowDown = function (e, t) {
                h._arrowDown.call(this, e, t, !0), this.selectOption(t);
            }),
            (u._enableElement = function (e) {
                r(e), e.setAttribute(this._state, "true");
            }),
            (u._disableElement = function (e) {
                o(e), e.setAttribute(this._state, "false");
            }),
            (u.selectOption = function (e) {
                o(this._navItems[this.selectedNavitemIndex]), h.selectOption.call(this, e), r(this._navItems[this.focusedNavItemIndex]);
            }),
            (e.exports = c);
    },
    function (e, t, i) {
        "use strict";
        var s = i(24),
            n = i(23),
            r = i(41),
            o = i(3).EventEmitterMicro,
            a = o.prototype,
            l = i(7),
            h = i(42),
            c = [l.BUSY, l.CHECKED, l.DISABLED, l.EXPANDED, l.HIDDEN, l.INVALID, l.PRESSED, l.SELECTED],
            u = function (e, t) {
                o.call(this), (this._options = t || {}), (this._selector = t.selector || ".navitem"), (this._allowMultiSelection = t.multiSelection || !1);
                var i = c.indexOf(t.state) > -1 ? t.state : l.SELECTED;
                (this.el = e),
                    (this._navItems = e.querySelectorAll(this._selector)),
                    (this._navItems = Array.prototype.slice.call(this._navItems)),
                    (this._state = i),
                    (this._navKeys = {}),
                    (this.selectOption = this.selectOption.bind(this)),
                    (this._handleKeyDown = this._handleKeyDown.bind(this)),
                    this._setup();
            };
        (u.ONSELECT = "onSelect"), (u.ONFOCUS = "onFocus");
        var d = (u.prototype = Object.create(a));
        (d._setup = function () {
            for (var e = [h.ARROW_DOWN, h.ARROW_RIGHT], t = [h.ARROW_UP, h.ARROW_LEFT], i = [h.ENTER, h.SPACEBAR], s = 0; s < e.length; s++)
                this.addNavkey(e[s], this._arrowDown.bind(this, !0)), this.addNavkey(t[s], this._arrowDown.bind(this, null)), this.addNavkey(i[s], this.selectOption);
            this._setupNavItems();
        }),
            (d._setupNavItems = function () {
                if (this._navItems.length) {
                    for (var e = 0; e < this._navItems.length; e++) this._setTabbingByIndex(e);
                    (void 0 !== this.focusedNavItemIndex && void 0 !== this.selectedNavitemIndex) || this.setSelectedItemByIndex(0, !0);
                }
            }),
            (d._setTabbingByIndex = function (e) {
                var t = this._navItems[e];
                r(t.getAttribute(this._state)) && ((this.focusedNavItemIndex = e), (this.selectedNavitemIndex = e)), r(t.getAttribute(l.DISABLED)) ? s(t) : n(t);
            }),
            (d.start = function () {
                this._navItems.length < 1 || (this.el.addEventListener("keydown", this._handleKeyDown), this.el.addEventListener("click", this.selectOption));
            }),
            (d.stop = function () {
                this.el.removeEventListener("keydown", this._handleKeyDown), this.el.removeEventListener("click", this.selectOption);
            }),
            (d._handleKeyDown = function (e) {
                if (e.ctrlKey || e.altKey || e.metaKey) return !0;
                this._navKeys[e.keyCode] && this._navKeys[e.keyCode](e);
            }),
            (d._arrowDown = function (e, t, i) {
                t.preventDefault(),
                    (this.previousNavItemIndex = this.focusedNavItemIndex),
                    (this.focusedNavItemIndex = this._calculateIndex(e, this.focusedNavItemIndex)),
                    this._navItems[this.focusedNavItemIndex].focus(),
                    i || this.trigger(u.ONFOCUS, { event: t, index: this.focusedNavItemIndex, el: this._navItems[this.focusedNavItemIndex] });
            }),
            (d.selectOption = function (e, t) {
                e.preventDefault();
                var i = this._navItems.indexOf(document.activeElement);
                i > -1 && document.activeElement !== this._navItems[this.focusedNavItemIndex] && (this.focusedNavItemIndex = i),
                    this._allowMultiSelection
                        ? this._toggleState()
                        : (this._navItems[this.selectedNavitemIndex].setAttribute(this._state, "false"), this._navItems[this.focusedNavItemIndex].setAttribute(this._state, "true")),
                    (this.selectedNavitemIndex = this.focusedNavItemIndex),
                    t || this.trigger(u.ONSELECT, { event: e, index: this.selectedNavitemIndex, el: this._navItems[this.selectedNavitemIndex] });
            }),
            (d._toggleState = function () {
                var e = this._navItems[this.focusedNavItemIndex].getAttribute(this._state);
                r(e) ? this._navItems[this.focusedNavItemIndex].setAttribute(this._state, "false") : this._navItems[this.focusedNavItemIndex].setAttribute(this._state, "true");
            }),
            (d._calculateIndex = function (e, t) {
                var i = t;
                if (!0 === e) {
                    if (((i = ++i >= this._navItems.length ? 0 : i), !r(this._navItems[i].getAttribute(l.DISABLED)) || this._navItems[i].hasAttribute("disabled"))) return i;
                } else if (((i = --i < 0 ? this._navItems.length - 1 : i), !r(this._navItems[i].getAttribute(l.DISABLED)) || this._navItems[i].hasAttribute("disabled"))) return i;
                return this._calculateIndex(e, i);
            }),
            (d.updateNavItems = function () {
                var e = this.el.querySelectorAll(this._selector);
                this._navItems = Array.prototype.slice.call(e);
            }),
            (d.addNavItem = function (e) {
                e && e.nodeType && this._navItems.indexOf(e) < 0 && (r(e.getAttribute(l.DISABLED)) || n(e), this._navItems.push(e));
            }),
            (d.setSelectedItemByIndex = function (e, t) {
                this._allowMultiSelection || isNaN(this.selectedNavitemIndex) || this._navItems[this.selectedNavitemIndex].setAttribute(this._state, "false"),
                    (this.focusedNavItemIndex = e),
                    (this.selectedNavitemIndex = e),
                    this._navItems[this.selectedNavitemIndex].setAttribute(this._state, "true"),
                    t || this.trigger(u.ONSELECT, { event: null, index: this.focusedNavItemIndex, el: this._navItems[this.focusedNavItemIndex] });
            }),
            (d.getSelectedItem = function () {
                return this._navItems[this.selectedNavitemIndex];
            }),
            (d.getFocusedItem = function (e) {
                return this._navItems[this.focusedNavItemIndex];
            }),
            (d.addNavkey = function (e, t) {
                "function" == typeof t && "number" == typeof e ? (this._navKeys[e] = t) : console.warn("incorrect types arguments were passed");
            }),
            (d.removeNavkey = function (e) {
                delete this._navKeys[e];
            }),
            (d.destroy = function () {
                for (var e in (a.destroy.call(this),
                this.stop(),
                (this.el = null),
                (this._options = null),
                (this._selector = null),
                (this.focusedNavItemIndex = null),
                (this.selectedNavitemIndex = null),
                (this._navItems = null),
                (this._state = null),
                (this.selectOption = null),
                (this._handleKeyDown = null),
                this._navKeys))
                    this._navKeys.hasOwnProperty(e) && this.removeNavkey(e);
                this._navKeys = null;
            }),
            (e.exports = u);
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        t.default = { EMPTY: "loading-empty", LOADING: "loading", LOADED: "loaded", ERROR: "loading-error", DISABLED: "loading-disabled" };
    },
    function (e, t, i) {
        "use strict";
        e.exports = i(91)("warn");
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        t.default = { IDLE: "idle", PLAYING: "playing", PAUSED: "paused", ENDED: "ended" };
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }),
            Object.defineProperty(t, "Close", {
                enumerable: !0,
                get: function () {
                    return n.default;
                },
            }),
            Object.defineProperty(t, "CloseBundle", {
                enumerable: !0,
                get: function () {
                    return d.default;
                },
            }),
            Object.defineProperty(t, "CloseButton", {
                enumerable: !0,
                get: function () {
                    return r.default;
                },
            }),
            Object.defineProperty(t, "Focus", {
                enumerable: !0,
                get: function () {
                    return o.default;
                },
            }),
            Object.defineProperty(t, "FullBleed", {
                enumerable: !0,
                get: function () {
                    return a.default;
                },
            }),
            Object.defineProperty(t, "FullBleedBundle", {
                enumerable: !0,
                get: function () {
                    return m.default;
                },
            }),
            Object.defineProperty(t, "Keyboard", {
                enumerable: !0,
                get: function () {
                    return l.default;
                },
            }),
            Object.defineProperty(t, "Open", {
                enumerable: !0,
                get: function () {
                    return h.default;
                },
            }),
            Object.defineProperty(t, "PageOverlay", {
                enumerable: !0,
                get: function () {
                    return c.default;
                },
            }),
            Object.defineProperty(t, "PageOverlayBundle", {
                enumerable: !0,
                get: function () {
                    return p.default;
                },
            }),
            Object.defineProperty(t, "ScrollPosition", {
                enumerable: !0,
                get: function () {
                    return u.default;
                },
            });
        var n = s(i(207)),
            r = s(i(208)),
            o = s(i(209)),
            a = s(i(210)),
            l = s(i(211)),
            h = s(i(216)),
            c = s(i(217)),
            u = s(i(218)),
            d = s(i(219)),
            m = s(i(220)),
            p = s(i(221));
    },
    function (e, t, i) {
        "use strict";
        var s = i(38);
        e.exports = function e(t, i, n) {
            i = i || document.body;
            for (var r = t, o = t; (r = r.previousElementSibling); ) s(r, n);
            for (; (o = o.nextElementSibling); ) s(o, n);
            t.parentElement && t.parentElement !== i && e(t.parentElement, i, n);
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(39);
        e.exports = function e(t, i) {
            i = i || document.body;
            for (var n = t, r = t; (n = n.previousElementSibling); ) s(n);
            for (; (r = r.nextElementSibling); ) s(r);
            t.parentElement && t.parentElement !== i && e(t.parentElement, i);
        };
    },
    function (e, t, i) {
        "use strict";
        function s(e, t) {
            if ("function" != typeof e) throw new TypeError("Ease expects an easing function.");
            (this.easingFunction = e), (this.cssString = t || null);
        }
        (s.prototype.getValue = function (e) {
            return this.easingFunction(e, 0, 1, 1);
        }),
            (e.exports = s);
    },
    function (e, t, i) {
        "use strict";
        var s = { ua: window.navigator.userAgent, platform: window.navigator.platform, vendor: window.navigator.vendor };
        e.exports = i(57)(s);
    },
    function (e, t, i) {
        "use strict";
        var s = i(58),
            n = i(59);
        function r(e, t) {
            if ("function" == typeof e.parseVersion) return e.parseVersion(t);
            var i,
                s = e.version || e.userAgent;
            "string" == typeof s && (s = [s]);
            for (var n, r = s.length, o = 0; o < r; o++) if ((n = t.match(((i = s[o]), new RegExp(i + "[a-zA-Z\\s/:]+([0-9_.]+)", "i")))) && n.length > 1) return n[1].replace(/_/g, ".");
            return !1;
        }
        function o(e, t, i) {
            for (var s, n, o = e.length, a = 0; a < o; a++)
                if (("function" == typeof e[a].test ? !0 === e[a].test(i) && (s = e[a].name) : i.ua.indexOf(e[a].userAgent) > -1 && (s = e[a].name), s)) {
                    if (((t[s] = !0), "string" == typeof (n = r(e[a], i.ua)))) {
                        var l = n.split(".");
                        (t.version.string = n), l && l.length > 0 && ((t.version.major = parseInt(l[0] || 0)), (t.version.minor = parseInt(l[1] || 0)), (t.version.patch = parseInt(l[2] || 0)));
                    } else "edge" === s && ((t.version.string = "12.0.0"), (t.version.major = "12"), (t.version.minor = "0"), (t.version.patch = "0"));
                    return "function" == typeof e[a].parseDocumentMode && (t.version.documentMode = e[a].parseDocumentMode()), t;
                }
            return t;
        }
        e.exports = function (e) {
            var t = {};
            return (t.browser = o(n.browser, s.browser, e)), (t.os = o(n.os, s.os, e)), t;
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            browser: {
                safari: !1,
                chrome: !1,
                firefox: !1,
                ie: !1,
                opera: !1,
                android: !1,
                edge: !1,
                edgeChromium: !1,
                samsung: !1,
                version: { string: "", major: 0, minor: 0, patch: 0, documentMode: !1 },
            },
            os: { osx: !1, ios: !1, android: !1, windows: !1, linux: !1, fireos: !1, chromeos: !1, version: { string: "", major: 0, minor: 0, patch: 0 } },
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            browser: [
                {
                    name: "edge",
                    userAgent: "Edge",
                    version: ["rv", "Edge"],
                    test: function (e) {
                        return e.ua.indexOf("Edge") > -1 || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" === e.ua;
                    },
                },
                {
                    name: "edgeChromium",
                    userAgent: "Edge",
                    version: ["rv", "Edg"],
                    test: function (e) {
                        return e.ua.indexOf("Edg") > -1 && -1 === e.ua.indexOf("Edge");
                    },
                },
                { name: "chrome", userAgent: "Chrome" },
                {
                    name: "firefox",
                    test: function (e) {
                        return e.ua.indexOf("Firefox") > -1 && -1 === e.ua.indexOf("Opera");
                    },
                    version: "Firefox",
                },
                { name: "android", userAgent: "Android" },
                {
                    name: "safari",
                    test: function (e) {
                        return e.ua.indexOf("Safari") > -1 && e.vendor.indexOf("Apple") > -1;
                    },
                    version: "Version",
                },
                {
                    name: "ie",
                    test: function (e) {
                        return e.ua.indexOf("IE") > -1 || e.ua.indexOf("Trident") > -1;
                    },
                    version: ["MSIE", "rv"],
                    parseDocumentMode: function () {
                        var e = !1;
                        return document.documentMode && (e = parseInt(document.documentMode, 10)), e;
                    },
                },
                { name: "opera", userAgent: "Opera", version: ["Version", "Opera"] },
                { name: "samsung", userAgent: "SamsungBrowser" },
            ],
            os: [
                {
                    name: "windows",
                    test: function (e) {
                        return e.ua.indexOf("Windows") > -1;
                    },
                    version: "Windows NT",
                },
                {
                    name: "osx",
                    userAgent: "Mac",
                    test: function (e) {
                        return e.ua.indexOf("Macintosh") > -1;
                    },
                },
                {
                    name: "ios",
                    test: function (e) {
                        return e.ua.indexOf("iPhone") > -1 || e.ua.indexOf("iPad") > -1;
                    },
                    version: ["iPhone OS", "CPU OS"],
                },
                {
                    name: "linux",
                    userAgent: "Linux",
                    test: function (e) {
                        return (e.ua.indexOf("Linux") > -1 || e.platform.indexOf("Linux") > -1) && -1 === e.ua.indexOf("Android");
                    },
                },
                {
                    name: "fireos",
                    test: function (e) {
                        return e.ua.indexOf("Firefox") > -1 && e.ua.indexOf("Mobile") > -1;
                    },
                    version: "rv",
                },
                {
                    name: "android",
                    userAgent: "Android",
                    test: function (e) {
                        return e.ua.indexOf("Android") > -1;
                    },
                },
                { name: "chromeos", userAgent: "CrOS" },
            ],
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            getWindow: function () {
                return window;
            },
            getDocument: function () {
                return document;
            },
            getNavigator: function () {
                return navigator;
            },
        };
    },
    ,
    function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            let i = e.getPropertyValue(t);
            return (i = i.match(/\(.+\)/)[0]), (i = i.replace(/\(+/, "(")), (i = i.replace(/\)+/, ")")), (i = i.replace(/"+/g, "")), matchMedia(i);
        };
    },
    function (e, t, i) {
        "use strict";
        function s() {
            this._createElements(), this._bindEvents();
        }
        var n = s.prototype;
        (n._bindEvents = function () {
            this._onResize = this._resize.bind(this);
        }),
            (n._createElements = function () {
                this.span = document.createElement("span");
                var e = this.span.style;
                if (((e.visibility = "hidden"), (e.position = "absolute"), (e.top = "0"), (e.zIndex = "-1"), (this.span.innerHTML = "&nbsp;"), !window.ResizeObserver)) {
                    this.iframe = document.createElement("iframe");
                    var t = this.iframe.style;
                    (t.position = "absolute"), (t.top = "0"), (t.left = "0"), (t.width = "100%"), (t.height = "100%"), this.span.appendChild(this.iframe);
                }
                document.body.appendChild(this.span);
            }),
            (n.detect = function (e) {
                (this.originalSize = e || 17),
                    (this.currentSize = parseFloat(window.getComputedStyle(this.span)["font-size"])),
                    this.currentSize > this.originalSize && this._onResize(),
                    this.isDetecting ||
                        (window.ResizeObserver
                            ? ((this.resizeObserver = new ResizeObserver(this._onResize)), this.resizeObserver.observe(this.span))
                            : this.iframe.contentWindow.addEventListener("resize", this._onResize),
                        (this.isDetecting = !0));
            }),
            (n._resize = function () {
                (this.currentSize = parseFloat(window.getComputedStyle(this.span)["font-size"])),
                    this.originalSize < this.currentSize ? document.documentElement.classList.add("text-zoom") : document.documentElement.classList.remove("text-zoom"),
                    window.dispatchEvent(new Event("resize")),
                    window.dispatchEvent(new CustomEvent("resize:text-zoom", { detail: this }));
            }),
            (n.getScale = function () {
                return this.currentSize / this.originalSize;
            }),
            (n.remove = function () {
                this.isDetecting &&
                    (this.resizeObserver && this.resizeObserver.unobserve(this.span), this.iframe && this.iframe.contentWindow.removeEventListener("resize", this._onResize), (this.isDetecting = !1));
            }),
            (n.destroy = function () {
                this.remove(), this.span && this.span.parentElement && this.span.parentElement.removeChild(this.span), (this.span = null), (this.iframe = null), (this.resizeObserver = null);
            }),
            (e.exports = new s());
    },
    function (e, t, i) {
        "use strict";
        const s = 1e-5,
            n = Math.abs;
        class r {
            constructor(e, t, i, s) {
                (this.cp = new Float32Array(6)),
                    (this.cp[0] = 3 * e),
                    (this.cp[1] = 3 * (i - e) - this.cp[0]),
                    (this.cp[2] = 1 - this.cp[0] - this.cp[1]),
                    (this.cp[3] = 3 * t),
                    (this.cp[4] = 3 * (s - t) - this.cp[3]),
                    (this.cp[5] = 1 - this.cp[3] - this.cp[4]);
            }
            sampleCurveX(e) {
                return ((this.cp[2] * e + this.cp[1]) * e + this.cp[0]) * e;
            }
            sampleCurveY(e) {
                return ((this.cp[5] * e + this.cp[4]) * e + this.cp[3]) * e;
            }
            sampleCurveDerivativeX(e) {
                return (3 * this.cp[2] * e + 2 * this.cp[1]) * e + this.cp[0];
            }
            solveCurveX(e) {
                var t, i, r, o, a, l;
                for (r = e, l = 0; l < 5; l++) {
                    if (((o = this.sampleCurveX(r) - e), n(o) < s)) return r;
                    if (((a = this.sampleCurveDerivativeX(r)), n(a) < s)) break;
                    r -= o / a;
                }
                if ((r = e) < (t = 0)) return t;
                if (r > (i = 1)) return i;
                for (; t < i; ) {
                    if (((o = this.sampleCurveX(r)), n(o - e) < s)) return r;
                    e > o ? (t = r) : (i = r), (r = 0.5 * (i - t) + t);
                }
                return r;
            }
            solve(e) {
                return this.sampleCurveY(this.solveCurveX(e));
            }
        }
        const o = /\d*\.?\d+/g;
        (r.fromCSSString = function (e) {
            let t = e.match(o);
            if (4 !== t.length) throw `UnitBezier could not convert ${e} to cubic-bezier`;
            let i = t.map(Number),
                s = new r(i[0], i[1], i[2], i[3]);
            return s.solve.bind(s);
        }),
            (e.exports = r);
    },
    function (e, t, i) {
        "use strict";
        const { map: s } = i(5),
            n = {};
        class r {
            constructor(e, t, i, s) {
                (this.mass = e),
                    (this.stiffness = t),
                    (this.damping = i),
                    (this.initialVelocity = s),
                    (this.m_w0 = Math.sqrt(this.stiffness / this.mass)),
                    (this.m_zeta = this.damping / (2 * Math.sqrt(this.stiffness * this.mass))),
                    this.m_zeta < 1
                        ? ((this.m_wd = this.m_w0 * Math.sqrt(1 - this.m_zeta * this.m_zeta)), (this.m_A = 1), (this.m_B = (this.m_zeta * this.m_w0 - this.initialVelocity) / this.m_wd))
                        : ((this.m_wd = 0), (this.m_A = 1), (this.m_B = -this.initialVelocity + this.m_w0));
            }
            solve(e) {
                return (
                    1 -
                    (e =
                        this.m_zeta < 1
                            ? Math.exp(-e * this.m_zeta * this.m_w0) * (this.m_A * Math.cos(this.m_wd * e) + this.m_B * Math.sin(this.m_wd * e))
                            : (this.m_A + this.m_B * e) * Math.exp(-e * this.m_w0))
                );
            }
        }
        const o = /\d*\.?\d+/g;
        (r.fromCSSString = function (e) {
            let t = e.match(o);
            if (4 !== t.length) throw `SpringEasing could not convert ${cssString} to spring params`;
            let i = t.map(Number),
                a = new r(...i);
            const l = a.solve.bind(a);
            let h = 0;
            let c = (function () {
                if (n[e]) return n[e];
                const t = 1 / 6;
                let i,
                    s = 0;
                for (;;) {
                    h += t;
                    if (1 === l(h)) {
                        if ((s++, s >= 16)) {
                            i = h * t;
                            break;
                        }
                    } else s = 0;
                }
                return (n[e] = i), n[e];
            })();
            return function (e) {
                return 0 === e || 1 === e ? e : l(s(e, 0, 1, 0, c));
            };
        }),
            (e.exports = r);
    },
    function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            if ("string" != typeof e) return e;
            try {
                return (t || document).querySelector(e) || document.querySelector(e);
            } catch (e) {
                return !1;
            }
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = class {
            constructor() {
                (this.local = 0), (this.localUnclamped = 0), (this.lastPosition = 0);
            }
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = class {
            constructor(e, t) {
                (this.a = e.top - t), this.a < 0 && (this.a = e.top), (this.b = e.top), (this.d = e.bottom), (this.c = Math.max(this.d - t, this.b));
            }
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(70),
            n = new (i(34))();
        class r {
            constructor(e) {
                (this.group = e), (this.data = { target: null, anchors: null, metrics: this.group.metrics });
            }
            parseArray(e, t) {
                return [this.parseExpression(e, t[0]), this.parseExpression(e, t[1])];
            }
            parseExpression(e, t) {
                if (!t) return null;
                if ("number" == typeof t) return t;
                if ("string" != typeof t) throw `Expression must be a string, received ${typeof t}: ${t}`;
                return (
                    (this.data.target = e.controller.element),
                    (this.data.anchors = e.anchors),
                    (this.data.keyframe = e.keyframe),
                    this.group.anim.plugins.parser.reduce((i, s) => i || s.parseExpression.call(this, e, t), null) || r._parse(t, this.data)
                );
            }
            parseTimeValue(e, t) {
                if ("number" == typeof t) return t;
                let i = this.group.expressionParser.parseExpression(e, t);
                return this.group.convertScrollPositionToTValue(i);
            }
            destroy() {
                this.group = null;
            }
            static parse(e, t) {
                return (t = t || {}) && (n.clear(), t.target && n.add(t.target), t.anchors && t.anchors.forEach((e) => n.add(e))), (t.metrics = n), r._parse(e, t);
            }
            static _parse(e, t) {
                return s.Parse(e).execute(t);
            }
        }
        (r.programs = s.programs), "undefined" != typeof window && (window.ExpressionParser = r), (e.exports = r);
    },
    function (e, t, i) {
        "use strict";
        const s = i(1),
            n = i(5),
            r = {},
            o = {
                smoothstep: (e, t, i) => (i = o.clamp((i - e) / (t - e), 0, 1)) * i * (3 - 2 * i),
                deg: (e) => (180 * e) / Math.PI,
                rad: (e) => (e * Math.PI) / 180,
                random: (e, t) => Math.random() * (t - e) + e,
                atan: Math.atan2,
            };
        Object.getOwnPropertyNames(Math).forEach((e) => (o[e] ? null : (o[e.toLowerCase()] = Math[e]))), Object.getOwnPropertyNames(n).forEach((e) => (o[e] ? null : (o[e.toLowerCase()] = n[e])));
        let a = null;
        const l = "a",
            h = "ALPHA",
            c = "(",
            u = ")",
            d = "PLUS",
            m = "MINUS",
            p = "MUL",
            f = "DIV",
            _ = "INTEGER_CONST",
            g = "FLOAT_CONST",
            y = ",",
            E = "EOF",
            b = {
                NUMBERS: /\d|\d\.\d/,
                DIGIT: /\d/,
                OPERATOR: /[-+*/]/,
                PAREN: /[()]/,
                WHITE_SPACE: /\s/,
                ALPHA: /[a-zA-Z]|%/,
                ALPHANUMERIC: /[a-zA-Z0-9]/,
                OBJECT_UNIT: /^(t|l|b|r|%w|%h|%|h|w)$/,
                GLOBAL_METRICS_UNIT: /^(px|vh|vw)$/,
                ANY_UNIT: /^(t|l|b|r|%w|%h|%|h|w|px|vh|vw)$/,
                MATH_FUNCTION: new RegExp(`\\b(${Object.keys(o).join("|")})\\b`, "i"),
            },
            v = function (e, t, i) {
                let s = t.slice(Math.max(i, 0), Math.min(t.length, i + 3)),
                    n = new Error(`Expression Error. ${e} in expression "${t}", near "${s}"`);
                throw (console.error(n.message, a ? a.keyframe || a.target : ""), n);
            },
            T = { round: 1, clamp: 3, lerp: 3, random: 2, atan: 2, floor: 1, ceil: 1, abs: 1, cos: 1, sin: 1, smoothstep: 3, rad: 1, deg: 1, pow: 2, calc: 1 };
        class A {
            constructor(e, t) {
                (this.type = e), (this.value = t);
            }
        }
        (A.ONE = new A("100", 100)), (A.EOF = new A(E, null));
        class w {
            constructor(e) {
                this.type = e;
            }
        }
        class C extends w {
            constructor(e, t) {
                super("UnaryOp"), (this.token = this.op = e), (this.expr = t);
            }
        }
        class O extends w {
            constructor(e, t, i) {
                super("BinOp"), (this.left = e), (this.op = t), (this.right = i);
            }
        }
        class S extends w {
            constructor(e, t) {
                if ((super("MathOp"), (this.op = e), (this.list = t), T[e.value] && t.length !== T[e.value]))
                    throw new Error(`Incorrect number of arguments for '${e.value}'. Received ${t.length}, expected ${T[e.value]}`);
            }
        }
        class I extends w {
            constructor(e) {
                super("Num"), (this.token = e), (this.value = e.value);
            }
        }
        class x extends w {
            constructor(e, t, i) {
                super("RefValue"), (this.num = e), (this.ref = t), (this.unit = i);
            }
        }
        class P extends w {
            constructor(e, t) {
                super("CSSValue"), (this.ref = e), (this.propertyName = t);
            }
        }
        class D extends w {
            constructor(e, t) {
                super("PropValue"), (this.ref = e), (this.propertyName = t);
            }
        }
        class M {
            constructor(e) {
                let t;
                for (this.text = e, this.pos = 0, this.char = this.text[this.pos], this.tokens = []; (t = this.getNextToken()) && t !== A.EOF; ) this.tokens.push(t);
                this.tokens.push(t);
            }
            advance() {
                this.char = this.text[++this.pos];
            }
            skipWhiteSpace() {
                for (; null != this.char && b.WHITE_SPACE.test(this.char); ) this.advance();
            }
            name() {
                let e = "";
                for (; null != this.char && b.ALPHA.test(this.char); ) (e += this.char), this.advance();
                return new A(h, e);
            }
            number() {
                let e = "";
                for ("." === this.char && ((e += this.char), this.advance()); null != this.char && b.DIGIT.test(this.char); ) (e += this.char), this.advance();
                if (null != this.char && "." === this.char)
                    for (e.includes(".") && v("Number appears to contain 2 decimal points", this.text, this.pos), e += this.char, this.advance(); null != this.char && b.DIGIT.test(this.char); )
                        (e += this.char), this.advance();
                return "." === e && v("Attempted to parse a number, but found only a decimal point", this.text, this.pos), e.includes(".") ? new A(g, parseFloat(e)) : new A(_, parseInt(e));
            }
            getNextToken() {
                for (; null != this.char; )
                    if (b.WHITE_SPACE.test(this.char)) this.skipWhiteSpace();
                    else {
                        if ("." === this.char || b.DIGIT.test(this.char)) return this.number();
                        if ("," === this.char) return this.advance(), new A(y, ",");
                        if (b.OPERATOR.test(this.char)) {
                            let e = "",
                                t = this.char;
                            switch (t) {
                                case "+":
                                    e = d;
                                    break;
                                case "-":
                                    e = m;
                                    break;
                                case "*":
                                    e = p;
                                    break;
                                case "/":
                                    e = f;
                            }
                            return this.advance(), new A(e, t);
                        }
                        if (b.PAREN.test(this.char)) {
                            let e = "",
                                t = this.char;
                            switch (t) {
                                case "(":
                                    e = c;
                                    break;
                                case ")":
                                    e = u;
                            }
                            return this.advance(), new A(e, t);
                        }
                        if (b.ALPHA.test(this.char)) return this.name();
                        v(`Unexpected character "${this.char}"`, this.text, this.pos);
                    }
                return A.EOF;
            }
        }
        class R {
            constructor(e) {
                (this.lexer = e), (this.pos = 0);
            }
            get currentToken() {
                return this.lexer.tokens[this.pos];
            }
            error(e) {
                v(e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", this.lexer.text, this.pos);
            }
            consume(e) {
                let t = this.currentToken;
                return t.type === e ? (this.pos += 1) : this.error(`Invalid token ${this.currentToken.value}, expected ${e}`), t;
            }
            consumeList(e) {
                e.includes(this.currentToken) ? (this.pos += 1) : this.error(`Invalid token ${this.currentToken.value}, expected ${tokenType}`);
            }
            expr() {
                let e = this.term();
                for (; this.currentToken.type === d || this.currentToken.type === m; ) {
                    const t = this.currentToken;
                    switch (t.value) {
                        case "+":
                            this.consume(d);
                            break;
                        case "-":
                            this.consume(m);
                    }
                    e = new O(e, t, this.term());
                }
                return e;
            }
            term() {
                let e = this.factor();
                for (; this.currentToken.type === p || this.currentToken.type === f; ) {
                    const t = this.currentToken;
                    switch (t.value) {
                        case "*":
                            this.consume(p);
                            break;
                        case "/":
                            this.consume(f);
                    }
                    e = new O(e, t, this.factor());
                }
                return e;
            }
            factor() {
                if (this.currentToken.type === d) return new C(this.consume(d), this.factor());
                if (this.currentToken.type === m) return new C(this.consume(m), this.factor());
                if (this.currentToken.type === _ || this.currentToken.type === g) {
                    let e = new I(this.currentToken);
                    if (((this.pos += 1), b.OPERATOR.test(this.currentToken.value) || this.currentToken.type === u || this.currentToken.type === y || this.currentToken.type === E)) return e;
                    if (this.currentToken.type === h && this.currentToken.value === l) return this.consume(h), new x(e, this.anchorIndex(), this.unit(b.ANY_UNIT));
                    if (this.currentToken.type === h) return "%a" === this.currentToken.value && this.error("%a is invalid, try removing the %"), new x(e, null, this.unit());
                    this.error("Expected a scaling unit type", "Such as 'h' / 'w'");
                } else {
                    if (b.OBJECT_UNIT.test(this.currentToken.value)) return new x(new I(A.ONE), null, this.unit());
                    if (this.currentToken.value === l) {
                        this.consume(h);
                        const e = this.anchorIndex();
                        if (b.OBJECT_UNIT.test(this.currentToken.value)) return new x(new I(A.ONE), e, this.unit());
                    } else if (this.currentToken.type === h) {
                        if ("calc" === this.currentToken.value) return this.consume(h), this.expr();
                        if ("css" === this.currentToken.value || "var" === this.currentToken.value || "prop" === this.currentToken.value) {
                            const e = "prop" !== this.currentToken.value ? P : D;
                            this.consume(h), this.consume(c);
                            const t = this.propertyName();
                            let i = null;
                            return this.currentToken.type === y && (this.consume(y), this.consume(h), (i = this.anchorIndex())), this.consume(u), new e(i, t);
                        }
                        if (b.MATH_FUNCTION.test(this.currentToken.value)) {
                            const e = this.currentToken.value.toLowerCase();
                            if ("number" == typeof o[e]) return this.consume(h), new I(new A(h, o[e]));
                            const t = A[e] || new A(e, e),
                                i = [];
                            this.consume(h), this.consume(c);
                            let s = null;
                            do {
                                this.currentToken.value === y && this.consume(y), (s = this.expr()), i.push(s);
                            } while (this.currentToken.value === y);
                            return this.consume(u), new S(t, i);
                        }
                    } else if (this.currentToken.type === c) {
                        this.consume(c);
                        let e = this.expr();
                        return this.consume(u), e;
                    }
                }
                this.error(`Unexpected token ${this.currentToken.value}`);
            }
            propertyName() {
                let e = "";
                for (; this.currentToken.type === h || this.currentToken.type === m; ) (e += this.currentToken.value), (this.pos += 1);
                return e;
            }
            unit() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : b.ANY_UNIT;
                const t = this.currentToken;
                if (t.type === h && e.test(t.value)) return this.consume(h), new A(h, (t.value = t.value.replace(/%(h|w)/, "$1").replace("%", "h")));
                this.error("Expected unit type");
            }
            anchorIndex() {
                const e = this.currentToken;
                if (e.type === _) return this.consume(_), new I(e);
                this.error("Invalid anchor reference", ". Should be something like a0, a1, a2");
            }
            parse() {
                const e = this.expr();
                return this.currentToken !== A.EOF && this.error(`Unexpected token ${this.currentToken.value}`), e;
            }
        }
        class N {
            constructor(e) {
                (this.parser = e), (this.root = e.parse());
            }
            visit(e) {
                let t = this[e.type];
                if (!t) throw new Error(`No visit method named, ${t}`);
                return t.call(this, e);
            }
            BinOp(e) {
                switch (e.op.type) {
                    case d:
                        return this.visit(e.left) + this.visit(e.right);
                    case m:
                        return this.visit(e.left) - this.visit(e.right);
                    case p:
                        return this.visit(e.left) * this.visit(e.right);
                    case f:
                        return this.visit(e.left) / this.visit(e.right);
                }
            }
            RefValue(e) {
                let t = this.unwrapReference(e),
                    i = e.unit.value,
                    n = e.num.value;
                const r = a.metrics.get(t);
                switch (i) {
                    case "h":
                        return 0.01 * n * r.height;
                    case "t":
                        return 0.01 * n * r.top;
                    case "vh":
                        return 0.01 * n * s.pageMetrics.windowHeight;
                    case "vw":
                        return 0.01 * n * s.pageMetrics.windowWidth;
                    case "px":
                        return n;
                    case "w":
                        return 0.01 * n * r.width;
                    case "b":
                        return 0.01 * n * r.bottom;
                    case "l":
                        return 0.01 * n * r.left;
                    case "r":
                        return 0.01 * n * r.right;
                }
            }
            PropValue(e) {
                return (null === e.ref ? a.target : a.anchors[e.ref.value])[e.propertyName];
            }
            CSSValue(e) {
                let t = this.unwrapReference(e);
                const i = getComputedStyle(t).getPropertyValue(e.propertyName);
                return "" === i ? 0 : N.Parse(i).execute(a);
            }
            Num(e) {
                return e.value;
            }
            UnaryOp(e) {
                return e.op.type === d ? +this.visit(e.expr) : e.op.type === m ? -this.visit(e.expr) : void 0;
            }
            MathOp(e) {
                let t = e.list.map((e) => this.visit(e));
                return o[e.op.value].apply(null, t);
            }
            unwrapReference(e) {
                return null === e.ref
                    ? a.target
                    : (e.ref.value >= a.anchors.length && console.error(`Not enough anchors supplied for expression ${this.parser.lexer.text}`, a.target), a.anchors[e.ref.value]);
            }
            execute(e) {
                return (a = e), this.visit(this.root);
            }
            static Parse(e) {
                return r[e] || (r[e] = new N(new R(new M(e))));
            }
        }
        (N.programs = r), (e.exports = N);
    },
    function (e, t, i) {
        "use strict";
        const s = i(1),
            n = i(4),
            r = i(72),
            o = i(33),
            a = i(18),
            l = i(73),
            h = i(17),
            c = i(30),
            u = i(3).EventEmitterMicro,
            d = i(74),
            m = {};
        "undefined" != typeof window && ((m.update = i(15)), (m.external = i(36)), (m.draw = i(11)));
        const { transformAttributes: p, cssAttributes: f, domAttributes: _ } = i(31),
            g = Math.PI / 180,
            y = { create: i(81), rotateX: i(82), rotateY: i(83), rotateZ: i(84), scale: i(85) };
        e.exports = class extends u {
            constructor(e, t) {
                super(),
                    (this._events.draw = []),
                    (this.uuid = c()),
                    (this.group = e),
                    (this.element = t),
                    (this._ownerIsElement = this.element instanceof Element),
                    this._ownerIsElement
                        ? (this.friendlyName = this.element.tagName + "." + Array.from(this.element.classList).join("."))
                        : (this.friendlyName = this.element.friendlyName || this.uuid),
                    (this.element._animInfo = this.element._animInfo || new o(e, this)),
                    (this.element._animInfo.controller = this),
                    (this.element._animInfo.group = this.group),
                    this.element._animInfo.controllers.push(this),
                    (this.tweenProps = this.element._animInfo.tweenProps),
                    (this.eventObject = new r(this)),
                    (this.needsStyleUpdate = !1),
                    (this.needsClassUpdate = !1),
                    (this.elementMetrics = this.group.metrics.add(this.element)),
                    (this.attributes = []),
                    (this.cssAttributes = []),
                    (this.domAttributes = []),
                    (this.keyframes = {}),
                    (this._allKeyframes = []),
                    (this._activeKeyframes = []),
                    (this.keyframesRequiringDispatch = []),
                    this.updateCachedValuesFromElement(),
                    (this.boundsMin = 0),
                    (this.boundsMax = 0),
                    (this.mat2d = new Float32Array(6)),
                    (this.mat4 = y.create()),
                    (this.needsWrite = !0),
                    (this.onDOMWriteImp = this._ownerIsElement ? this.onDOMWriteForElement : this.onDOMWriteForObject);
            }
            destroy() {
                if (this.element._animInfo) {
                    this.element._animInfo.controller === this && (this.element._animInfo.controller = null);
                    let e = this.element._animInfo.controllers.indexOf(this);
                    if ((-1 !== e && this.element._animInfo.controllers.splice(e, 1), 0 === this.element._animInfo.controllers.length)) this.element._animInfo = null;
                    else {
                        let e = this.element._animInfo.controllers.find((e) => e.group !== e.group.anim.tweenGroup);
                        e && ((this.element._animInfo.controller = e), (this.element._animInfo.group = e.group));
                    }
                }
                (this.eventObject.controller = null),
                    (this.eventObject.element = null),
                    (this.eventObject.keyframe = null),
                    (this.eventObject.tweenProps = null),
                    (this.eventObject = null),
                    (this.elementMetrics = null),
                    (this.group = null),
                    (this.keyframesRequiringDispatch = null);
                for (let e = 0; e < this._allKeyframes.length; e++) this._allKeyframes[e].destroy();
                (this._allKeyframes = null),
                    (this._activeKeyframes = null),
                    (this.attributes = null),
                    (this.keyframes = null),
                    (this.element = null),
                    (this.tweenProps = null),
                    (this.destroyed = !0),
                    super.destroy();
            }
            remove() {
                return this.group.removeKeyframeController(this);
            }
            updateCachedValuesFromElement() {
                if (!this._ownerIsElement) return;
                const e = this.getTargetComputedStyle(!0);
                let t = new DOMMatrix(e.getPropertyValue("transform")),
                    i = d(t),
                    r = s.KeyframeDefaults.epsilon,
                    o = !1;
                ["x", "y", "z"].forEach((e, t) => {
                    this.tweenProps[e] = new n(i.translation[t], r, o, e);
                }),
                    (this.tweenProps.rotation = new n(i.rotation[2], r, o, "rotation")),
                    ["rotationX", "rotationY", "rotationZ"].forEach((e, t) => {
                        this.tweenProps[e] = new n(i.rotation[t], r, o, e);
                    }),
                    (this.tweenProps.scale = new n(i.scale[0], r, o, "scale")),
                    ["scaleX", "scaleY", "scaleZ"].forEach((e, t) => {
                        this.tweenProps[e] = new n(i.scale[t], r, o, e);
                    });
            }
            addKeyframe(e) {
                let t = l(e);
                if (!t) throw new Error("AnimSystem Cannot create keyframe for from options `" + e + "`");
                let i = new t(this, e);
                return i.parseOptions(e), (i.id = this._allKeyframes.length), this._allKeyframes.push(i), i;
            }
            needsUpdate() {
                for (let e = 0, t = this.attributes.length; e < t; e++) {
                    let t = this.attributes[e];
                    if (this.tweenProps[t].needsUpdate()) return !0;
                }
                return !1;
            }
            updateLocalProgress(e) {
                for (let t = 0, i = this.attributes.length; t < i; t++) {
                    let i = this.attributes[t],
                        s = this.keyframes[this.attributes[t]];
                    if (1 === s.length) {
                        s[0].updateLocalProgress(e);
                        continue;
                    }
                    let n = this.getNearestKeyframeForAttribute(i, e);
                    n && n.updateLocalProgress(e);
                }
            }
            reconcile() {
                for (let e = 0, t = this.attributes.length; e < t; e++) {
                    let t = this.attributes[e],
                        i = this.getNearestKeyframeForAttribute(t, this.group.position.local);
                    i.updateLocalProgress(this.group.position.local), i.snapAtCreation && i.reconcile(t);
                }
            }
            determineActiveKeyframes(e) {
                e = e || h(Array.from(document.documentElement.classList));
                let t = this._activeKeyframes,
                    i = this.attributes,
                    s = {};
                (this._activeKeyframes = []), (this.attributes = []), (this.keyframes = {});
                for (let t = 0; t < this._allKeyframes.length; t++) {
                    let i = this._allKeyframes[t];
                    if (i.markedForRemoval || i.hidden || !i.setEnabled(e)) for (let e in i.animValues) (this.tweenProps[e].isActive = i.preserveState), i.preserveState && (s[e] = !0);
                    else {
                        this._activeKeyframes.push(i);
                        for (let e in i.animValues)
                            (this.keyframes[e] = this.keyframes[e] || []),
                                this.keyframes[e].push(i),
                                -1 === this.attributes.indexOf(e) && ((s[e] = !0), this.attributes.push(e), (this.tweenProps[e].isActive = !0));
                    }
                }
                this.attributes.forEach((e) => (this.tweenProps[e].isActive = !0)),
                    (this.cssAttributes = this.attributes.filter((e) => f.includes(e) || e.startsWith("--")).map((e) => this.tweenProps[e])),
                    (this.domAttributes = this.attributes.filter((e) => _.includes(e)).map((e) => this.tweenProps[e]));
                let n = t.filter((e) => -1 === this._activeKeyframes.indexOf(e));
                if (0 === n.length) return;
                let r = i.filter((e) => -1 === this.attributes.indexOf(e) && !s.hasOwnProperty(e));
                if (0 !== r.length)
                    if (((this.needsWrite = !0), this._ownerIsElement))
                        m.external(() => {
                            let e = r.some((e) => p.includes(e)),
                                t = e && Object.keys(s).some((e) => p.includes(e));
                            e && !t && this.element.style.removeProperty("transform");
                            for (let e = 0, t = r.length; e < t; ++e) {
                                let t = r[e],
                                    i = this.tweenProps[t],
                                    s = i.isActive ? i.target : i.initialValue;
                                (i.current = i.target = s), !i.isActive && f.includes(t) && (this.element.style[t] = null);
                            }
                            for (let e = 0, t = n.length; e < t; ++e) {
                                let t = n[e];
                                t instanceof a && !t.preserveState && t._unapply();
                            }
                        }, !0);
                    else
                        for (let e = 0, t = r.length; e < t; ++e) {
                            let t = this.tweenProps[r[e]];
                            (t.current = t.target), (t.isActive = !1);
                        }
            }
            onDOMRead(e) {
                for (let t = 0, i = this.attributes.length; t < i; t++) {
                    let i = this.attributes[t],
                        s = this.getNearestKeyframeForAttribute(i, e);
                    s && s.onDOMRead(i) && (this.needsWrite = !0);
                }
            }
            onDOMWrite() {
                (this.needsWrite || this.needsClassUpdate || this.needsStyleUpdate) && ((this.needsWrite = !1), this.onDOMWriteImp(), this.handleEventDispatch());
            }
            onDOMWriteForObject() {
                for (let e = 0, t = this.attributes.length; e < t; e++) {
                    let t = this.attributes[e];
                    this.element[t] = this.tweenProps[t].current;
                }
            }
            onDOMWriteForElement() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.element.style;
                this.handleStyleTransform(e);
                for (let t = 0, i = this.cssAttributes.length; t < i; t++) this.cssAttributes[t].set(e);
                for (let e = 0, t = this.domAttributes.length; e < t; e++) this.domAttributes[e].set(this.element);
                if (this.needsStyleUpdate) {
                    for (let e in this.tweenProps.targetStyles)
                        null !== this.tweenProps.targetStyles[e] && (this.element.style[e] = this.tweenProps.targetStyles[e]), (this.tweenProps.targetStyles[e] = null);
                    this.needsStyleUpdate = !1;
                }
                this.needsClassUpdate &&
                    (this.tweenProps.targetClasses.add.length > 0 && this.element.classList.add.apply(this.element.classList, this.tweenProps.targetClasses.add),
                    this.tweenProps.targetClasses.remove.length > 0 && this.element.classList.remove.apply(this.element.classList, this.tweenProps.targetClasses.remove),
                    (this.tweenProps.targetClasses.add.length = 0),
                    (this.tweenProps.targetClasses.remove.length = 0),
                    (this.needsClassUpdate = !1));
            }
            handleStyleTransform() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.element.style,
                    t = this.tweenProps;
                if (t.z.isActive || t.rotationX.isActive || t.rotationY.isActive) {
                    const i = this.mat4;
                    (i[0] = 1),
                        (i[1] = 0),
                        (i[2] = 0),
                        (i[3] = 0),
                        (i[4] = 0),
                        (i[5] = 1),
                        (i[6] = 0),
                        (i[7] = 0),
                        (i[8] = 0),
                        (i[9] = 0),
                        (i[10] = 1),
                        (i[11] = 0),
                        (i[12] = 0),
                        (i[13] = 0),
                        (i[14] = 0),
                        (i[15] = 1);
                    const s = t.x.current,
                        n = t.y.current,
                        r = t.z.current;
                    if (
                        ((i[12] = i[0] * s + i[4] * n + i[8] * r + i[12]),
                        (i[13] = i[1] * s + i[5] * n + i[9] * r + i[13]),
                        (i[14] = i[2] * s + i[6] * n + i[10] * r + i[14]),
                        (i[15] = i[3] * s + i[7] * n + i[11] * r + i[15]),
                        0 !== t.rotation.current || 0 !== t.rotationZ.current)
                    ) {
                        const e = (t.rotation.current || t.rotationZ.current) * g;
                        y.rotateZ(i, i, e);
                    }
                    if (0 !== t.rotationX.current) {
                        const e = t.rotationX.current * g;
                        y.rotateX(i, i, e);
                    }
                    if (0 !== t.rotationY.current) {
                        const e = t.rotationY.current * g;
                        y.rotateY(i, i, e);
                    }
                    (1 === t.scale.current && 1 === t.scaleX.current && 1 === t.scaleY.current) || y.scale(i, i, [t.scale.current, t.scale.current, 1]),
                        (e.transform =
                            "matrix3d(" +
                            i[0] +
                            "," +
                            i[1] +
                            "," +
                            i[2] +
                            "," +
                            i[3] +
                            "," +
                            i[4] +
                            "," +
                            i[5] +
                            "," +
                            i[6] +
                            "," +
                            i[7] +
                            "," +
                            i[8] +
                            "," +
                            i[9] +
                            "," +
                            i[10] +
                            "," +
                            i[11] +
                            "," +
                            i[12] +
                            "," +
                            i[13] +
                            "," +
                            i[14] +
                            "," +
                            i[15] +
                            ")");
                } else if (t.x.isActive || t.y.isActive || t.rotation.isActive || t.rotationZ.isActive || t.scale.isActive || t.scaleX.isActive || t.scaleY.isActive) {
                    const i = this.mat2d;
                    (i[0] = 1), (i[1] = 0), (i[2] = 0), (i[3] = 1), (i[4] = 0), (i[5] = 0);
                    const s = t.x.current,
                        n = t.y.current,
                        r = i[0],
                        o = i[1],
                        a = i[2],
                        l = i[3],
                        h = i[4],
                        c = i[5];
                    if (((i[0] = r), (i[1] = o), (i[2] = a), (i[3] = l), (i[4] = r * s + a * n + h), (i[5] = o * s + l * n + c), 0 !== t.rotation.current || 0 !== t.rotationZ.current)) {
                        const e = (t.rotation.current || t.rotationZ.current) * g,
                            s = i[0],
                            n = i[1],
                            r = i[2],
                            o = i[3],
                            a = i[4],
                            l = i[5],
                            h = Math.sin(e),
                            c = Math.cos(e);
                        (i[0] = s * c + r * h), (i[1] = n * c + o * h), (i[2] = s * -h + r * c), (i[3] = n * -h + o * c), (i[4] = a), (i[5] = l);
                    }
                    t.scaleX.isActive || t.scaleY.isActive
                        ? ((i[0] = i[0] * t.scaleX.current), (i[1] = i[1] * t.scaleX.current), (i[2] = i[2] * t.scaleY.current), (i[3] = i[3] * t.scaleY.current))
                        : ((i[0] = i[0] * t.scale.current), (i[1] = i[1] * t.scale.current), (i[2] = i[2] * t.scale.current), (i[3] = i[3] * t.scale.current)),
                        (e.transform = "matrix(" + i[0] + ", " + i[1] + ", " + i[2] + ", " + i[3] + ", " + i[4] + ", " + i[5] + ")");
                }
            }
            handleEventDispatch() {
                if (0 !== this.keyframesRequiringDispatch.length) {
                    for (let e = 0, t = this.keyframesRequiringDispatch.length; e < t; e++) {
                        let t = this.keyframesRequiringDispatch[e];
                        (t.needsEventDispatch = !1),
                            (this.eventObject.keyframe = t),
                            (this.eventObject.pageMetrics = s.pageMetrics),
                            (this.eventObject.event = t.event),
                            this.trigger(t.event, this.eventObject);
                    }
                    this.keyframesRequiringDispatch.length = 0;
                }
                if (0 !== this._events.draw.length) {
                    (this.eventObject.keyframe = null), (this.eventObject.event = "draw");
                    for (let e = this._events.draw.length - 1; e >= 0; e--) this._events.draw[e](this.eventObject);
                }
            }
            updateAnimationConstraints() {
                for (let e = 0, t = this._activeKeyframes.length; e < t; e++) this._activeKeyframes[e].evaluateConstraints();
                this.attributes.forEach((e) => {
                    1 !== this.keyframes[e].length && this.keyframes[e].sort(s.KeyframeComparison);
                }),
                    this.updateDeferredPropertyValues();
            }
            refreshMetrics() {
                let e = new Set([this.element]);
                this._allKeyframes.forEach((t) => t.anchors.forEach((t) => e.add(t))), this.group.metrics.refreshCollection(e), (this.group.keyframesDirty = !0);
            }
            getTargetComputedStyle() {
                let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return this._ownerIsElement
                    ? ((e || void 0 === this.group.computedStyleCache[this.uuid]) && (this.group.computedStyleCache[this.uuid] = getComputedStyle(this.element)),
                      this.group.computedStyleCache[this.uuid])
                    : null;
            }
            updateDeferredPropertyValues() {
                for (let e = 0, t = this.attributes.length; e < t; e++) {
                    let t = this.attributes[e],
                        i = this.keyframes[t];
                    if (!(i[0].keyframeType > s.KeyframeTypes.InterpolationForward))
                        for (let e = 0, s = i.length; e < s; e++) {
                            let n = i[e];
                            null === n.jsonProps[t][0] && (0 === e ? (n.jsonProps[t][0] = n.animValues[t][0] = this.tweenProps[t].current) : (n.animValues[t][0] = i[e - 1].animValues[t][1])),
                                null === n.jsonProps[t][1] && (n.animValues[t][1] = e === s - 1 ? this.tweenProps[t].current : i[e + 1].animValues[t][0]),
                                n.snapAtCreation && ((n.jsonProps[t][0] = n.animValues[t][0]), (n.jsonProps[t][1] = n.animValues[t][1]));
                        }
                }
            }
            getBounds(e) {
                (this.boundsMin = Number.MAX_VALUE), (this.boundsMax = -Number.MAX_VALUE);
                for (let t = 0, i = this.attributes.length; t < i; t++) {
                    let i = this.keyframes[this.attributes[t]];
                    for (let t = 0; t < i.length; t++) {
                        let s = i[t];
                        (this.boundsMin = Math.min(s.start, this.boundsMin)), (this.boundsMax = Math.max(s.end, this.boundsMax)), (e.min = Math.min(s.start, e.min)), (e.max = Math.max(s.end, e.max));
                    }
                }
            }
            getNearestKeyframeForAttribute(e, t) {
                t = void 0 !== t ? t : this.group.position.local;
                let i = null,
                    s = Number.POSITIVE_INFINITY,
                    n = this.keyframes[e];
                if (void 0 === n) return null;
                let r = n.length;
                if (0 === r) return null;
                if (1 === r) return n[0];
                for (let e = 0; e < r; e++) {
                    let r = n[e];
                    if (r.isInRange(t)) {
                        i = r;
                        break;
                    }
                    let o = Math.min(Math.abs(t - r.start), Math.abs(t - r.end));
                    o < s && ((s = o), (i = r));
                }
                return i;
            }
            getAllKeyframesForAttribute(e) {
                return this.keyframes[e];
            }
            updateKeyframe(e, t) {
                e.parseOptions(t),
                    e.evaluateConstraints(),
                    (this.group.keyframesDirty = !0),
                    m.update(() => {
                        this.trigger(s.EVENTS.ON_KEYFRAME_UPDATED, e), this.group.trigger(s.EVENTS.ON_KEYFRAME_UPDATED, e);
                    }, !0);
            }
            removeKeyframe(e) {
                return e.controller !== this
                    ? Promise.resolve(null)
                    : ((e.markedForRemoval = !0),
                      (this.group.keyframesDirty = !0),
                      new Promise((t) => {
                          this.group.rafEmitter.executor.eventEmitter.once("before:draw", () => {
                              t(e), e.destroy();
                              let i = this._allKeyframes.indexOf(e);
                              -1 !== i && this._allKeyframes.splice(i, 1);
                          });
                      }));
            }
            updateAnimation(e, t) {
                return this.group.gui && console.warn("KeyframeController.updateAnimation(keyframe,props) has been deprecated. Please use updateKeyframe(keyframe,props)"), this.updateKeyframe(e, t);
            }
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = class {
            constructor(e) {
                (this.controller = e), (this.element = this.controller.element), (this.keyframe = null), (this.event = ""), (this.tweenProps = this.controller.tweenProps);
            }
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(1),
            n = i(13),
            r = i(32),
            o = i(18),
            a = function (e) {
                for (let t in e) {
                    let i = e[t];
                    if (-1 === s.KeyframeJSONReservedWords.indexOf(t) && Array.isArray(i)) return !0;
                }
                return !1;
            };
        e.exports = function (e) {
            if (void 0 !== e.cssClass || void 0 !== e.style) {
                if (a(e)) throw "CSS Keyframes cannot tween values, please use multiple keyframes instead";
                return o;
            }
            if (a(e)) return n;
            if (e.event) return r;
            throw (delete e.anchors, `Could not determine tween type based on ${JSON.stringify(e)}`);
        };
    },
    function (e, t, i) {
        "use strict";
        "undefined" != typeof window && (window.DOMMatrix = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix);
        const s = 180 / Math.PI,
            n = (e) => Math.round(1e6 * e) / 1e6;
        function r(e) {
            return Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
        }
        function o(e, t) {
            return 0 === t ? Array.from(e) : [e[0] / t, e[1] / t, e[2] / t];
        }
        function a(e, t) {
            return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
        }
        function l(e, t, i, s) {
            return [e[0] * i + t[0] * s, e[1] * i + t[1] * s, e[2] * i + t[2] * s];
        }
        function h(e) {
            const t = new Float32Array(4),
                i = new Float32Array(3),
                h = new Float32Array(3),
                c = new Float32Array(3);
            (c[0] = e[3][0]), (c[1] = e[3][1]), (c[2] = e[3][2]);
            const u = new Array(3);
            for (let t = 0; t < 3; t++) u[t] = e[t].slice(0, 3);
            (i[0] = r(u[0])),
                (u[0] = o(u[0], i[0])),
                (h[0] = a(u[0], u[1])),
                (u[1] = l(u[1], u[0], 1, -h[0])),
                (i[1] = r(u[1])),
                (u[1] = o(u[1], i[1])),
                (h[0] /= i[1]),
                (h[1] = a(u[0], u[2])),
                (u[2] = l(u[2], u[0], 1, -h[1])),
                (h[2] = a(u[1], u[2])),
                (u[2] = l(u[2], u[1], 1, -h[2])),
                (i[2] = r(u[2])),
                (u[2] = o(u[2], i[2])),
                (h[1] /= i[2]),
                (h[2] /= i[2]);
            const d = ((m = u[1]), (p = u[2]), [m[1] * p[2] - m[2] * p[1], m[2] * p[0] - m[0] * p[2], m[0] * p[1] - m[1] * p[0]]);
            var m, p;
            if (a(u[0], d) < 0) for (let e = 0; e < 3; e++) (i[e] *= -1), (u[e][0] *= -1), (u[e][1] *= -1), (u[e][2] *= -1);
            let f;
            return (
                (t[0] = 0.5 * Math.sqrt(Math.max(1 + u[0][0] - u[1][1] - u[2][2], 0))),
                (t[1] = 0.5 * Math.sqrt(Math.max(1 - u[0][0] + u[1][1] - u[2][2], 0))),
                (t[2] = 0.5 * Math.sqrt(Math.max(1 - u[0][0] - u[1][1] + u[2][2], 0))),
                (t[3] = 0.5 * Math.sqrt(Math.max(1 + u[0][0] + u[1][1] + u[2][2], 0))),
                u[2][1] > u[1][2] && (t[0] = -t[0]),
                u[0][2] > u[2][0] && (t[1] = -t[1]),
                u[1][0] > u[0][1] && (t[2] = -t[2]),
                (f =
                    t[0] < 0.001 && t[0] >= 0 && t[1] < 0.001 && t[1] >= 0
                        ? [0, 0, n((180 * Math.atan2(u[0][1], u[0][0])) / Math.PI)]
                        : (function (e) {
                              const [t, i, r, o] = e,
                                  a = t * t,
                                  l = i * i,
                                  h = r * r,
                                  c = t * i + r * o,
                                  u = o * o + a + l + h;
                              return c > 0.49999 * u
                                  ? [0, 2 * Math.atan2(t, o) * s, 90]
                                  : c < -0.49999 * u
                                  ? [0, -2 * Math.atan2(t, o) * s, -90]
                                  : [n(Math.atan2(2 * t * o - 2 * i * r, 1 - 2 * a - 2 * h) * s), n(Math.atan2(2 * i * o - 2 * t * r, 1 - 2 * l - 2 * h) * s), n(Math.asin(2 * t * i + 2 * r * o) * s)];
                          })(t)),
                { translation: c, rotation: f, eulerRotation: f, scale: [n(i[0]), n(i[1]), n(i[2])] }
            );
        }
        e.exports = function (e) {
            e instanceof Element && (e = String(getComputedStyle(e).transform).trim());
            let t = new DOMMatrix(e);
            const i = new Array(4);
            for (let e = 1; e < 5; e++) {
                const s = (i[e - 1] = new Float32Array(4));
                for (let i = 1; i < 5; i++) s[i - 1] = t[`m${e}${i}`];
            }
            return h(i);
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(76),
            n = function (e) {
                (this.phase = e),
                    (this.rafEmitter = new s()),
                    this._cachePhaseIndex(),
                    (this.requestAnimationFrame = this.requestAnimationFrame.bind(this)),
                    (this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this)),
                    (this._onBeforeRAFExecutorStart = this._onBeforeRAFExecutorStart.bind(this)),
                    (this._onBeforeRAFExecutorPhase = this._onBeforeRAFExecutorPhase.bind(this)),
                    (this._onAfterRAFExecutorPhase = this._onAfterRAFExecutorPhase.bind(this)),
                    this.rafEmitter.on(this.phase, this._onRAFExecuted.bind(this)),
                    this.rafEmitter.executor.eventEmitter.on("before:start", this._onBeforeRAFExecutorStart),
                    this.rafEmitter.executor.eventEmitter.on("before:" + this.phase, this._onBeforeRAFExecutorPhase),
                    this.rafEmitter.executor.eventEmitter.on("after:" + this.phase, this._onAfterRAFExecutorPhase),
                    (this._frameCallbacks = []),
                    (this._currentFrameCallbacks = []),
                    (this._nextFrameCallbacks = []),
                    (this._phaseActive = !1),
                    (this._currentFrameID = -1),
                    (this._cancelFrameIdx = -1),
                    (this._frameCallbackLength = 0),
                    (this._currentFrameCallbacksLength = 0),
                    (this._nextFrameCallbacksLength = 0),
                    (this._frameCallbackIteration = 0);
            },
            r = n.prototype;
        (r.requestAnimationFrame = function (e, t) {
            return (
                !0 === t && this.rafEmitter.executor.phaseIndex > 0 && this.rafEmitter.executor.phaseIndex <= this.phaseIndex
                    ? this._phaseActive
                        ? ((this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !0)),
                          this._frameCallbacks.push(this._currentFrameID, e),
                          (this._frameCallbackLength += 2))
                        : ((this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !1)),
                          this._currentFrameCallbacks.push(this._currentFrameID, e),
                          (this._currentFrameCallbacksLength += 2))
                    : ((this._currentFrameID = this.rafEmitter.run()), this._nextFrameCallbacks.push(this._currentFrameID, e), (this._nextFrameCallbacksLength += 2)),
                this._currentFrameID
            );
        }),
            (r.cancelAnimationFrame = function (e) {
                (this._cancelFrameIdx = this._nextFrameCallbacks.indexOf(e)),
                    this._cancelFrameIdx > -1
                        ? this._cancelNextAnimationFrame()
                        : ((this._cancelFrameIdx = this._currentFrameCallbacks.indexOf(e)),
                          this._cancelFrameIdx > -1
                              ? this._cancelCurrentAnimationFrame()
                              : ((this._cancelFrameIdx = this._frameCallbacks.indexOf(e)), this._cancelFrameIdx > -1 && this._cancelRunningAnimationFrame()));
            }),
            (r._onRAFExecuted = function (e) {
                for (this._frameCallbackIteration = 0; this._frameCallbackIteration < this._frameCallbackLength; this._frameCallbackIteration += 2)
                    this._frameCallbacks[this._frameCallbackIteration + 1](e.time, e);
                (this._frameCallbacks.length = 0), (this._frameCallbackLength = 0);
            }),
            (r._onBeforeRAFExecutorStart = function () {
                Array.prototype.push.apply(this._currentFrameCallbacks, this._nextFrameCallbacks.splice(0, this._nextFrameCallbacksLength)),
                    (this._currentFrameCallbacksLength = this._nextFrameCallbacksLength),
                    (this._nextFrameCallbacks.length = 0),
                    (this._nextFrameCallbacksLength = 0);
            }),
            (r._onBeforeRAFExecutorPhase = function () {
                (this._phaseActive = !0),
                    Array.prototype.push.apply(this._frameCallbacks, this._currentFrameCallbacks.splice(0, this._currentFrameCallbacksLength)),
                    (this._frameCallbackLength = this._currentFrameCallbacksLength),
                    (this._currentFrameCallbacks.length = 0),
                    (this._currentFrameCallbacksLength = 0);
            }),
            (r._onAfterRAFExecutorPhase = function () {
                this._phaseActive = !1;
            }),
            (r._cachePhaseIndex = function () {
                this.phaseIndex = this.rafEmitter.executor.phases.indexOf(this.phase);
            }),
            (r._cancelRunningAnimationFrame = function () {
                this._frameCallbacks.splice(this._cancelFrameIdx, 2), (this._frameCallbackLength -= 2);
            }),
            (r._cancelCurrentAnimationFrame = function () {
                this._currentFrameCallbacks.splice(this._cancelFrameIdx, 2), (this._currentFrameCallbacksLength -= 2);
            }),
            (r._cancelNextAnimationFrame = function () {
                this._nextFrameCallbacks.splice(this._cancelFrameIdx, 2), (this._nextFrameCallbacksLength -= 2), 0 === this._nextFrameCallbacksLength && this.rafEmitter.cancel();
            }),
            (e.exports = n);
    },
    function (e, t, i) {
        "use strict";
        var s = i(10),
            n = function (e) {
                s.call(this, e);
            };
        ((n.prototype = Object.create(s.prototype))._subscribe = function () {
            return this.executor.subscribe(this, !0);
        }),
            (e.exports = n);
    },
    function (e, t, i) {
        "use strict";
        var s = i(20).SharedInstance,
            n = i(35).majorVersionNumber,
            r = i(79);
        e.exports = s.share("@marcom/ac-raf-emitter/sharedRAFExecutorInstance", n, r);
    },
    function (e, t, i) {
        "use strict";
        var s,
            n = "undefined" != typeof window ? window : {},
            r = n.AC,
            o =
                ((s = {}),
                {
                    get: function (e, t) {
                        var i = null;
                        return s[e] && s[e][t] && (i = s[e][t]), i;
                    },
                    set: function (e, t, i) {
                        return s[e] || (s[e] = {}), (s[e][t] = "function" == typeof i ? new i() : i), s[e][t];
                    },
                    share: function (e, t, i) {
                        var s = this.get(e, t);
                        return s || (s = this.set(e, t, i)), s;
                    },
                    remove: function (e, t) {
                        var i = typeof t;
                        if ("string" !== i && "number" !== i) s[e] && (s[e] = null);
                        else {
                            if (!s[e] || !s[e][t]) return;
                            s[e][t] = null;
                        }
                    },
                });
        r || (r = n.AC = {}), r.SharedInstance || (r.SharedInstance = o), (e.exports = r.SharedInstance);
    },
    function (e, t, i) {
        "use strict";
        var s,
            n = i(12);
        function r(e) {
            (e = e || {}),
                this._reset(),
                this.updatePhases(),
                (this.eventEmitter = new n()),
                (this._willRun = !1),
                (this._totalSubscribeCount = -1),
                (this._requestAnimationFrame = window.requestAnimationFrame),
                (this._cancelAnimationFrame = window.cancelAnimationFrame),
                (this._boundOnAnimationFrame = this._onAnimationFrame.bind(this)),
                (this._boundOnExternalAnimationFrame = this._onExternalAnimationFrame.bind(this));
        }
        ((s = r.prototype).frameRequestedPhase = "requested"),
            (s.startPhase = "start"),
            (s.runPhases = ["update", "external", "draw"]),
            (s.endPhase = "end"),
            (s.disabledPhase = "disabled"),
            (s.beforePhaseEventPrefix = "before:"),
            (s.afterPhaseEventPrefix = "after:"),
            (s.subscribe = function (e, t) {
                return (
                    this._totalSubscribeCount++,
                    this._nextFrameSubscribers[e.id] ||
                        (t ? this._nextFrameSubscribersOrder.unshift(e.id) : this._nextFrameSubscribersOrder.push(e.id),
                        (this._nextFrameSubscribers[e.id] = e),
                        this._nextFrameSubscriberArrayLength++,
                        this._nextFrameSubscriberCount++,
                        this._run()),
                    this._totalSubscribeCount
                );
            }),
            (s.subscribeImmediate = function (e, t) {
                return (
                    this._totalSubscribeCount++,
                    this._subscribers[e.id] ||
                        (t ? this._subscribersOrder.splice(this._currentSubscriberIndex + 1, 0, e.id) : this._subscribersOrder.unshift(e.id),
                        (this._subscribers[e.id] = e),
                        this._subscriberArrayLength++,
                        this._subscriberCount++),
                    this._totalSubscribeCount
                );
            }),
            (s.unsubscribe = function (e) {
                return !!this._nextFrameSubscribers[e.id] && ((this._nextFrameSubscribers[e.id] = null), this._nextFrameSubscriberCount--, 0 === this._nextFrameSubscriberCount && this._cancel(), !0);
            }),
            (s.getSubscribeID = function () {
                return (this._totalSubscribeCount += 1);
            }),
            (s.destroy = function () {
                var e = this._cancel();
                return (
                    this.eventEmitter.destroy(),
                    (this.eventEmitter = null),
                    (this.phases = null),
                    (this._subscribers = null),
                    (this._subscribersOrder = null),
                    (this._nextFrameSubscribers = null),
                    (this._nextFrameSubscribersOrder = null),
                    (this._rafData = null),
                    (this._boundOnAnimationFrame = null),
                    (this._onExternalAnimationFrame = null),
                    e
                );
            }),
            (s.useExternalAnimationFrame = function (e) {
                if ("boolean" == typeof e) {
                    var t = this._isUsingExternalAnimationFrame;
                    return (
                        e && this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), (this._animationFrame = null)),
                        !this._willRun || e || this._animationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)),
                        (this._isUsingExternalAnimationFrame = e),
                        e ? this._boundOnExternalAnimationFrame : t || !1
                    );
                }
            }),
            (s.updatePhases = function () {
                this.phases || (this.phases = []),
                    (this.phases.length = 0),
                    this.phases.push(this.frameRequestedPhase),
                    this.phases.push(this.startPhase),
                    Array.prototype.push.apply(this.phases, this.runPhases),
                    this.phases.push(this.endPhase),
                    (this._runPhasesLength = this.runPhases.length),
                    (this._phasesLength = this.phases.length);
            }),
            (s._run = function () {
                if (!this._willRun)
                    return (
                        (this._willRun = !0),
                        0 === this.lastFrameTime && (this.lastFrameTime = performance.now()),
                        (this._animationFrameActive = !0),
                        this._isUsingExternalAnimationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)),
                        this.phase === this.disabledPhase && ((this.phaseIndex = 0), (this.phase = this.phases[this.phaseIndex])),
                        !0
                    );
            }),
            (s._cancel = function () {
                var e = !1;
                return (
                    this._animationFrameActive &&
                        (this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), (this._animationFrame = null)),
                        (this._animationFrameActive = !1),
                        (this._willRun = !1),
                        (e = !0)),
                    this._isRunning || this._reset(),
                    e
                );
            }),
            (s._onAnimationFrame = function (e) {
                for (
                    this._subscribers = this._nextFrameSubscribers,
                        this._subscribersOrder = this._nextFrameSubscribersOrder,
                        this._subscriberArrayLength = this._nextFrameSubscriberArrayLength,
                        this._subscriberCount = this._nextFrameSubscriberCount,
                        this._nextFrameSubscribers = {},
                        this._nextFrameSubscribersOrder = [],
                        this._nextFrameSubscriberArrayLength = 0,
                        this._nextFrameSubscriberCount = 0,
                        this.phaseIndex = 0,
                        this.phase = this.phases[this.phaseIndex],
                        this._isRunning = !0,
                        this._willRun = !1,
                        this._didRequestNextRAF = !1,
                        this._rafData.delta = e - this.lastFrameTime,
                        this.lastFrameTime = e,
                        this._rafData.fps = 0,
                        this._rafData.delta >= 1e3 && (this._rafData.delta = 0),
                        0 !== this._rafData.delta && (this._rafData.fps = 1e3 / this._rafData.delta),
                        this._rafData.time = e,
                        this._rafData.naturalFps = this._rafData.fps,
                        this._rafData.timeNow = Date.now(),
                        this.phaseIndex++,
                        this.phase = this.phases[this.phaseIndex],
                        this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
                        this._currentSubscriberIndex = 0;
                    this._currentSubscriberIndex < this._subscriberArrayLength;
                    this._currentSubscriberIndex++
                )
                    null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] &&
                        !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy &&
                        this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameStart(this._rafData);
                for (this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase), this._runPhaseIndex = 0; this._runPhaseIndex < this._runPhasesLength; this._runPhaseIndex++) {
                    for (
                        this.phaseIndex++, this.phase = this.phases[this.phaseIndex], this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase), this._currentSubscriberIndex = 0;
                        this._currentSubscriberIndex < this._subscriberArrayLength;
                        this._currentSubscriberIndex++
                    )
                        null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] &&
                            !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy &&
                            this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]].trigger(this.phase, this._rafData);
                    this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase);
                }
                for (
                    this.phaseIndex++, this.phase = this.phases[this.phaseIndex], this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase), this._currentSubscriberIndex = 0;
                    this._currentSubscriberIndex < this._subscriberArrayLength;
                    this._currentSubscriberIndex++
                )
                    null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] &&
                        !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy &&
                        this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameEnd(this._rafData);
                this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase), this._willRun ? ((this.phaseIndex = 0), (this.phaseIndex = this.phases[this.phaseIndex])) : this._reset();
            }),
            (s._onExternalAnimationFrame = function (e) {
                this._isUsingExternalAnimationFrame && this._onAnimationFrame(e);
            }),
            (s._reset = function () {
                this._rafData || (this._rafData = {}),
                    (this._rafData.time = 0),
                    (this._rafData.delta = 0),
                    (this._rafData.fps = 0),
                    (this._rafData.naturalFps = 0),
                    (this._rafData.timeNow = 0),
                    (this._subscribers = {}),
                    (this._subscribersOrder = []),
                    (this._currentSubscriberIndex = -1),
                    (this._subscriberArrayLength = 0),
                    (this._subscriberCount = 0),
                    (this._nextFrameSubscribers = {}),
                    (this._nextFrameSubscribersOrder = []),
                    (this._nextFrameSubscriberArrayLength = 0),
                    (this._nextFrameSubscriberCount = 0),
                    (this._didEmitFrameData = !1),
                    (this._animationFrame = null),
                    (this._animationFrameActive = !1),
                    (this._isRunning = !1),
                    (this._shouldReset = !1),
                    (this.lastFrameTime = 0),
                    (this._runPhaseIndex = -1),
                    (this.phaseIndex = -1),
                    (this.phase = this.disabledPhase);
            }),
            (e.exports = r);
    },
    function (e, t, i) {
        "use strict";
        var s = i(20).SharedInstance,
            n = i(35).majorVersionNumber,
            r = function () {
                this._currentID = 0;
            };
        (r.prototype.getNewID = function () {
            return this._currentID++, "raf:" + this._currentID;
        }),
            (e.exports = s.share("@marcom/ac-raf-emitter/sharedRAFEmitterIDGeneratorInstance", n, r));
    },
    function (e, t) {
        e.exports = function () {
            var e = new Float32Array(16);
            return (
                (e[0] = 1),
                (e[1] = 0),
                (e[2] = 0),
                (e[3] = 0),
                (e[4] = 0),
                (e[5] = 1),
                (e[6] = 0),
                (e[7] = 0),
                (e[8] = 0),
                (e[9] = 0),
                (e[10] = 1),
                (e[11] = 0),
                (e[12] = 0),
                (e[13] = 0),
                (e[14] = 0),
                (e[15] = 1),
                e
            );
        };
    },
    function (e, t) {
        e.exports = function (e, t, i) {
            var s = Math.sin(i),
                n = Math.cos(i),
                r = t[4],
                o = t[5],
                a = t[6],
                l = t[7],
                h = t[8],
                c = t[9],
                u = t[10],
                d = t[11];
            t !== e && ((e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), (e[12] = t[12]), (e[13] = t[13]), (e[14] = t[14]), (e[15] = t[15]));
            return (
                (e[4] = r * n + h * s),
                (e[5] = o * n + c * s),
                (e[6] = a * n + u * s),
                (e[7] = l * n + d * s),
                (e[8] = h * n - r * s),
                (e[9] = c * n - o * s),
                (e[10] = u * n - a * s),
                (e[11] = d * n - l * s),
                e
            );
        };
    },
    function (e, t) {
        e.exports = function (e, t, i) {
            var s = Math.sin(i),
                n = Math.cos(i),
                r = t[0],
                o = t[1],
                a = t[2],
                l = t[3],
                h = t[8],
                c = t[9],
                u = t[10],
                d = t[11];
            t !== e && ((e[4] = t[4]), (e[5] = t[5]), (e[6] = t[6]), (e[7] = t[7]), (e[12] = t[12]), (e[13] = t[13]), (e[14] = t[14]), (e[15] = t[15]));
            return (
                (e[0] = r * n - h * s),
                (e[1] = o * n - c * s),
                (e[2] = a * n - u * s),
                (e[3] = l * n - d * s),
                (e[8] = r * s + h * n),
                (e[9] = o * s + c * n),
                (e[10] = a * s + u * n),
                (e[11] = l * s + d * n),
                e
            );
        };
    },
    function (e, t) {
        e.exports = function (e, t, i) {
            var s = Math.sin(i),
                n = Math.cos(i),
                r = t[0],
                o = t[1],
                a = t[2],
                l = t[3],
                h = t[4],
                c = t[5],
                u = t[6],
                d = t[7];
            t !== e && ((e[8] = t[8]), (e[9] = t[9]), (e[10] = t[10]), (e[11] = t[11]), (e[12] = t[12]), (e[13] = t[13]), (e[14] = t[14]), (e[15] = t[15]));
            return (
                (e[0] = r * n + h * s),
                (e[1] = o * n + c * s),
                (e[2] = a * n + u * s),
                (e[3] = l * n + d * s),
                (e[4] = h * n - r * s),
                (e[5] = c * n - o * s),
                (e[6] = u * n - a * s),
                (e[7] = d * n - l * s),
                e
            );
        };
    },
    function (e, t) {
        e.exports = function (e, t, i) {
            var s = i[0],
                n = i[1],
                r = i[2];
            return (
                (e[0] = t[0] * s),
                (e[1] = t[1] * s),
                (e[2] = t[2] * s),
                (e[3] = t[3] * s),
                (e[4] = t[4] * n),
                (e[5] = t[5] * n),
                (e[6] = t[6] * n),
                (e[7] = t[7] * n),
                (e[8] = t[8] * r),
                (e[9] = t[9] * r),
                (e[10] = t[10] * r),
                (e[11] = t[11] * r),
                (e[12] = t[12]),
                (e[13] = t[13]),
                (e[14] = t[14]),
                (e[15] = t[15]),
                e
            );
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(19),
            n = i(37),
            r = i(5);
        let o = 0;
        const a = {};
        "undefined" != typeof window && (a.create = i(10));
        class l extends s {
            constructor(e, t) {
                e || ((e = document.createElement("div")).className = "TimeGroup-" + o++),
                    super(e, t),
                    (this.name = this.name || e.getAttribute("data-anim-time-group")),
                    (this._isPaused = !0),
                    (this._repeats = 0),
                    (this._isReversed = !1),
                    (this._timeScale = 1),
                    (this._chapterPlayer = new n(this)),
                    (this.now = performance.now());
            }
            finalizeInit() {
                if (!this.anim) throw "TimeGroup not instantiated correctly. Please use `AnimSystem.createTimeGroup(el)`";
                (this.onPlayTimeUpdate = this.onPlayTimeUpdate.bind(this)), super.finalizeInit();
            }
            progress(e) {
                if (void 0 === e) return 0 === this.boundsMax ? 0 : this.position.local / this.boundsMax;
                let t = e * this.boundsMax;
                (this.timelineUpdateRequired = !0), this.updateTimeline(t);
            }
            time(e) {
                if (void 0 === e) return this.position.local;
                (e = r.clamp(e, this.boundsMin, this.duration)), (this.timelineUpdateRequired = !0), this.updateTimeline(e);
            }
            play(e) {
                this.reversed(!1), (this.isEnabled = !0), (this._isPaused = !1), this.time(e), (this.now = performance.now()), this._playheadEmitter.run();
            }
            reverse(e) {
                this.reversed(!0), (this.isEnabled = !0), (this._isPaused = !1), this.time(e), (this.now = performance.now()), this._playheadEmitter.run();
            }
            reversed(e) {
                if (void 0 === e) return this._isReversed;
                this._isReversed = e;
            }
            restart() {
                this._isReversed ? (this.progress(1), this.reverse(this.time())) : (this.progress(0), this.play(this.time()));
            }
            pause(e) {
                this.time(e), (this._isPaused = !0);
            }
            paused(e) {
                return void 0 === e ? this._isPaused : ((this._isPaused = e), this._isPaused || this.play(), this);
            }
            onPlayTimeUpdate() {
                if (this._isPaused) return;
                let e = performance.now(),
                    t = (e - this.now) / 1e3;
                (this.now = e), this._isReversed && (t = -t);
                let i = this.time() + t * this._timeScale;
                if (this._repeats === l.REPEAT_FOREVER || this._repeats > 0) {
                    let e = !1;
                    !this._isReversed && i > this.boundsMax ? ((i -= this.boundsMax), (e = !0)) : this._isReversed && i < 0 && ((i = this.boundsMax + i), (e = !0)),
                        e && (this._repeats = this._repeats === l.REPEAT_FOREVER ? l.REPEAT_FOREVER : this._repeats - 1);
                }
                this.time(i);
                let s = !this._isReversed && this.position.local !== this.duration,
                    n = this._isReversed && 0 !== this.position.local;
                s || n ? this._playheadEmitter.run() : this.paused(!0);
            }
            updateProgress(e) {
                this.hasDuration()
                    ? ((this.position.localUnclamped = e), (this.position.local = r.clamp(this.position.localUnclamped, this.boundsMin, this.boundsMax)))
                    : (this.position.local = this.position.localUnclamped = 0);
            }
            updateBounds() {
                if (0 === this.keyframeControllers.length) return (this.boundsMin = 0), void (this.boundsMax = 0);
                let e = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY };
                for (let t = 0, i = this.keyframeControllers.length; t < i; t++) this.keyframeControllers[t].getBounds(e);
                (this.boundsMin = 0),
                    (this.boundsMax = e.max),
                    (this.viewableRange.a = this.viewableRange.b = 0),
                    (this.viewableRange.c = this.viewableRange.d = this.boundsMax),
                    (this.timelineUpdateRequired = !0);
            }
            setupRAFEmitter(e) {
                (this._playheadEmitter = new a.create()), this._playheadEmitter.on("update", this.onPlayTimeUpdate), super.setupRAFEmitter(e);
            }
            get duration() {
                return this.keyframesDirty && this.onKeyframesDirty({ silent: !0 }), this.boundsMax;
            }
            timeScale(e) {
                return void 0 === e ? this._timeScale : ((this._timeScale = e), this);
            }
            repeats(e) {
                if (void 0 === e) return this._repeats;
                this._repeats = e;
            }
            getPosition() {
                return this.position.local;
            }
            addChapter(e) {
                return this._chapterPlayer.addChapter(e);
            }
            playToChapter(e) {
                this._chapterPlayer.playToChapter(e);
            }
            convertScrollPositionToTValue(e) {
                return e;
            }
            convertTValueToScrollPosition(e) {
                return e;
            }
            hasDuration() {
                return this.duration > 0;
            }
            destroy() {
                this._playheadEmitter.destroy(), (this._playheadEmitter = null), super.destroy();
            }
            get timelineProgress() {
                return this.progress();
            }
            set timelineProgress(e) {
                this.progress(e);
            }
            get progressValue() {
                return this.progress();
            }
            set progressValue(e) {
                this.progress(e);
            }
            get timeValue() {
                return this.time();
            }
            set timeValue(e) {
                this.time(e);
            }
        }
        (l.REPEAT_FOREVER = -1), (e.exports = l);
    },
    function (e, t, i) {
        "use strict";
        const s = i(19),
            n = (i(37), i(5));
        let r = 0;
        const o = {};
        "undefined" != typeof window && (o.create = i(10));
        e.exports = class extends s {
            constructor(e, t) {
                e || ((e = document.createElement("div")).className = "TweenGroup-" + r++),
                    super(e, t),
                    (this.name = "Tweens"),
                    (this.keyframes = []),
                    (this._isPaused = !1),
                    (this.now = performance.now());
            }
            finalizeInit() {
                (this.onTimeEmitterUpdate = this.onTimeEmitterUpdate.bind(this)), (this.removeExpiredKeyframeControllers = this.removeExpiredKeyframeControllers.bind(this)), super.finalizeInit();
            }
            destroy() {
                this._timeEmitter.destroy(), (this._timeEmitter = null), (this._keyframes = []), super.destroy();
            }
            setupRAFEmitter(e) {
                (this.now = performance.now()), (this._timeEmitter = new o.create()), this._timeEmitter.on("update", this.onTimeEmitterUpdate), this._timeEmitter.run(), super.setupRAFEmitter(e);
            }
            addKeyframe(e, t) {
                if (void 0 !== t.start || void 0 !== t.end) throw Error("Tweens do not have a start or end, they can only have a duration. Consider using a TimeGroup instead");
                if ("number" != typeof t.duration) throw Error("Tween options.duration is undefined, or is not a number");
                let i, s;
                (t.start = (t.delay || 0) + this.position.localUnclamped),
                    (t.end = t.start + t.duration),
                    (t.preserveState = !0),
                    (t.snapAtCreation = !0),
                    e._animInfo && ((i = e._animInfo.group), (s = e._animInfo.controller));
                let n = super.addKeyframe(e, t);
                return (
                    (e._animInfo.group = i),
                    (e._animInfo.controller = s),
                    t.onStart &&
                        n.controller.once("draw", (e) => {
                            (e.keyframe = n), t.onStart(e), (e.keyframe = null);
                        }),
                    t.onDraw &&
                        n.controller.on("draw", (e) => {
                            (e.keyframe = n), t.onDraw(e), (e.keyframe = null);
                        }),
                    this.removeOverlappingProps(n),
                    this.keyframes.push(n),
                    this._timeEmitter.willRun() || ((this.now = performance.now()), this._timeEmitter.run()),
                    n
                );
            }
            removeOverlappingProps(e) {
                if (e.controller._allKeyframes.length <= 1) return;
                let t = Object.keys(e.animValues),
                    i = e.controller;
                for (let s = 0, n = i._allKeyframes.length; s < n; s++) {
                    const n = i._allKeyframes[s];
                    if (n === e) continue;
                    if (n.markedForRemoval) continue;
                    let r = Object.keys(n.animValues),
                        o = r.filter((e) => t.includes(e));
                    o.length !== r.length ? o.forEach((e) => delete n.animValues[e]) : (n.markedForRemoval = !0);
                }
            }
            onTimeEmitterUpdate(e) {
                if (this._isPaused || 0 === this.keyframeControllers.length) return;
                let t = performance.now(),
                    i = (t - this.now) / 1e3;
                this.now = t;
                let s = this.position.local + i;
                (this.position.local = this.position.localUnclamped = s), this.onTimeUpdate();
            }
            onTimeUpdate() {
                for (let e = 0, t = this.keyframes.length; e < t; e++) this.keyframes[e].updateLocalProgress(this.position.localUnclamped);
                this.requestDOMChange(), this._timeEmitter.run(), null !== this.gui && this.gui.onScrollUpdate(this.position);
            }
            onDOMRead() {
                if ((this.keyframesDirty && this.onKeyframesDirty(), 0 !== this.keyframes.length))
                    for (let e = 0, t = this.keyframes.length; e < t; e++) {
                        this.keyframes[e].controller.needsWrite = !0;
                        for (let t in this.keyframes[e].animValues) this.keyframes[e].onDOMRead(t);
                    }
            }
            onDOMWrite() {
                super.onDOMWrite(), this.removeExpiredKeyframes();
            }
            removeExpiredKeyframes() {
                let e = this.keyframes.length,
                    t = e;
                for (; e--; ) {
                    let t = this.keyframes[e];
                    t.destroyed
                        ? this.keyframes.splice(e, 1)
                        : (t.markedForRemoval &&
                              (t.jsonProps.onComplete && 1 === t.localT && ((t.controller.eventObject.keyframe = t), t.jsonProps.onComplete(t.controller.eventObject), (t.jsonProps.onComplete = null)),
                              (null !== this.gui && this.gui.isDraggingPlayhead) || (t.remove(), this.keyframes.splice(e, 1))),
                          1 === t.localT && (t.markedForRemoval = !0));
                }
                (this.keyframes.length === t && 0 !== this.keyframes.length) || this._timeEmitter.executor.eventEmitter.once("after:draw", this.removeExpiredKeyframeControllers);
            }
            removeExpiredKeyframeControllers() {
                for (let e = 0, t = this.keyframeControllers.length; e < t; e++) {
                    let t = !0,
                        i = this.keyframeControllers[e];
                    for (let e = 0, s = i._allKeyframes.length; e < s; e++)
                        if (!i._allKeyframes[e].destroyed) {
                            t = !1;
                            break;
                        }
                    t && i.remove();
                }
            }
            updateBounds() {
                (this.boundsMin = Math.min(...this.keyframes.map((e) => e.start))), (this.boundsMax = Math.max(...this.keyframes.map((e) => e.end)));
            }
            play() {
                (this.isEnabled = !0), (this._isPaused = !1), (this.now = performance.now()), this._timeEmitter.run();
            }
            pause() {
                this._isPaused = !0;
            }
            paused() {
                return this._isPaused;
            }
            time(e) {
                if (void 0 === e) return this.position.local;
                (this.position.local = this.position.localUnclamped = n.clamp(e, this.boundsMin, this.boundsMax)), this.onTimeUpdate();
            }
            performTimelineDispatch() {}
            hasDuration() {
                return !0;
            }
            getPosition() {
                return this.position.local;
            }
            updateProgress(e) {}
            get duration() {
                return this.boundsMax;
            }
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = { version: "3.6.1", major: "3.x", majorMinor: "3.6" };
    },
    function (e, t, i) {
        "use strict";
        var s = i(9);
        e.exports = s.cancelAnimationFrame("update");
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CONTROL: 17,
            ALT: 18,
            COMMAND: 91,
            CAPSLOCK: 20,
            ESCAPE: 27,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            ARROW_LEFT: 37,
            ARROW_UP: 38,
            ARROW_RIGHT: 39,
            ARROW_DOWN: 40,
            DELETE: 46,
            ZERO: 48,
            ONE: 49,
            TWO: 50,
            THREE: 51,
            FOUR: 52,
            FIVE: 53,
            SIX: 54,
            SEVEN: 55,
            EIGHT: 56,
            NINE: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            NUMPAD_ZERO: 96,
            NUMPAD_ONE: 97,
            NUMPAD_TWO: 98,
            NUMPAD_THREE: 99,
            NUMPAD_FOUR: 100,
            NUMPAD_FIVE: 101,
            NUMPAD_SIX: 102,
            NUMPAD_SEVEN: 103,
            NUMPAD_EIGHT: 104,
            NUMPAD_NINE: 105,
            NUMPAD_ASTERISK: 106,
            NUMPAD_PLUS: 107,
            NUMPAD_DASH: 109,
            NUMPAD_DOT: 110,
            NUMPAD_SLASH: 111,
            NUMPAD_EQUALS: 187,
            TICK: 192,
            LEFT_BRACKET: 219,
            RIGHT_BRACKET: 221,
            BACKSLASH: 220,
            SEMICOLON: 186,
            APOSTRAPHE: 222,
            APOSTROPHE: 222,
            SPACEBAR: 32,
            CLEAR: 12,
            COMMA: 188,
            DOT: 190,
            SLASH: 191,
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(92);
        e.exports = function (e) {
            return function () {
                if (s && "object" == typeof window.console && "function" == typeof console[e]) return console[e].apply(console, Array.prototype.slice.call(arguments, 0));
            };
        };
    },
    function (e, t, i) {
        "use strict";
        var s = !1,
            n = window || self;
        try {
            s = !!n.localStorage.getItem("f7c9180f-5c45-47b4-8de4-428015f096c0");
        } catch (e) {}
        e.exports = s;
    },
    function (e, t, i) {
        "use strict";
        var s = i(14),
            n = i(53),
            r = i(54),
            o = function (e, t) {
                (t = t || {}),
                    (this._tabbables = null),
                    (this._excludeHidden = t.excludeHidden),
                    (this._firstTabbableElement = t.firstFocusElement),
                    (this._lastTabbableElement = null),
                    (this._relatedTarget = null),
                    (this.el = e),
                    (this._handleOnFocus = this._handleOnFocus.bind(this));
            },
            a = o.prototype;
        (a.start = function (e) {
            this.updateTabbables(), n(this.el, null, this._excludeHidden);
            let t = document.activeElement;
            this._firstTabbableElement
                ? this.el.contains(document.activeElement) || e || (this._firstTabbableElement.focus(), (t = this._firstTabbableElement))
                : console.warn("this._firstTabbableElement is null, CircularTab needs at least one tabbable element."),
                (this._relatedTarget = t),
                document.addEventListener("focus", this._handleOnFocus, !0);
        }),
            (a.stop = function () {
                r(this.el), document.removeEventListener("focus", this._handleOnFocus, !0);
            }),
            (a.updateTabbables = function () {
                (this._tabbables = s.getTabbableElements(this.el, this._excludeHidden)),
                    (this._firstTabbableElement = this._firstTabbableElement || this._tabbables[0]),
                    (this._lastTabbableElement = this._tabbables[this._tabbables.length - 1]);
            }),
            (a._handleOnFocus = function (e) {
                if (this.el.contains(e.target)) this._relatedTarget = e.target;
                else {
                    if ((e.preventDefault(), this.updateTabbables(), this._relatedTarget === this._lastTabbableElement || null === this._relatedTarget))
                        return this._firstTabbableElement.focus(), void (this._relatedTarget = this._firstTabbableElement);
                    if (this._relatedTarget === this._firstTabbableElement && this._lastTabbableElement)
                        return this._lastTabbableElement.focus(), void (this._relatedTarget = this._lastTabbableElement);
                }
            }),
            (a.destroy = function () {
                this.stop(),
                    (this.el = null),
                    (this._tabbables = null),
                    (this._firstTabbableElement = null),
                    (this._lastTabbableElement = null),
                    (this._relatedTarget = null),
                    (this._handleOnFocus = null);
            }),
            (e.exports = o);
    },
    ,
    ,
    ,
    function (e, t, i) {
        "use strict";
        e.exports = { BaseComponent: i(6) };
    },
    function (e, t, i) {
        "use strict";
        const s = i(12),
            n = i(142),
            r = i(145),
            o = i(146),
            a = i(147),
            l = i(148),
            h = i(149),
            c = i(150),
            u = i(151),
            d = i(152),
            m = [
                "beforeCreate",
                "created",
                "beforeMount",
                "createItems",
                "itemsCreated",
                "mounted",
                "animateToItem",
                "onItemChangeInitiated",
                "onItemChangeOccurred",
                "onItemChangeCompleted",
                "onResizeImmediate",
                "onBreakpointChange",
                "onResizeDebounced",
                "destroy",
            ];
        class p extends s {
            constructor(e) {
                var t;
                super(e),
                    (t = this),
                    (this.el = e.el),
                    (this.model = Object.assign({ options: e }, JSON.parse(JSON.stringify(n)))),
                    (this.model.Item.ConstructorFunction = n.Item.ConstructorFunction),
                    (this._items = []),
                    (this.currentIndex = 0),
                    m.forEach((e) => {
                        this[e] = function () {
                            for (var i = arguments.length, s = new Array(i), n = 0; n < i; n++) s[n] = arguments[n];
                            t[`__${e}`] && t[`__${e}`].forEach((e) => e.apply(t, s));
                        };
                    });
                const i = this.destroy;
                (this.destroy = function () {
                    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                    i.apply(t, n), s.prototype.destroy.call(t);
                }),
                    this.on(n.Events.ITEM_CHANGE_INITIATED, this.onItemChangeInitiated),
                    this.on(n.Events.ITEM_CHANGE_OCCURRED, this.onItemChangeOccurred),
                    this.on(n.Events.ITEM_CHANGE_COMPLETED, this.onItemChangeCompleted),
                    ["beforeCreate", "created", "beforeMount", "createItems"].forEach((t) => this[t](e));
            }
        }
        (p.withMixins = function () {
            const e = class extends p {},
                t = e.prototype;
            for (var i = arguments.length, s = new Array(i), n = 0; n < i; n++) s[n] = arguments[n];
            return (
                s.unshift(r, l, a, d),
                s.push(h, u, o, c),
                s.forEach((e) => {
                    for (const i in e) m.includes(i) ? ((t[`__${i}`] = t[`__${i}`] || []), t[`__${i}`].push(e[i])) : (t[i] = e[i]);
                }),
                e
            );
        }),
            (e.exports = p);
    },
    function (e, t, i) {
        "use strict";
        const s = i(154),
            n = i(44);
        e.exports = {
            mounted() {
                this.el.classList.remove("peeking"),
                    this._items.forEach((e) => {
                        e.measure(), (e.x = 0), (e.zIndex = e === this.currentItem ? 2 : 0);
                    }),
                    this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, { gallery: this, previous: null, current: this.currentItem });
            },
            animateToItem(e) {
                if (this.currentIndex === e || this.currentIndex === this.wrappedIndex(e)) return;
                this.el.parentElement.scrollLeft = 0;
                let t = this.model.IsTouch ? "easeOutCubic" : "easeInOutCubic";
                this.clip && this.clip._isPlaying && ((t = "easeOutQuint"), this.clip.destroy());
                const i = this.selections.occurred.previous,
                    r = this.selections.occurred.current,
                    o = this._items[this.wrappedIndex(e)];
                (o.opacity = 0), i && (i.zIndex = 0), r && (r.zIndex = 1), (o.zIndex = 2);
                let a = !1;
                (this.clip = new s(this.model.Fade.duration, {
                    ease: n[t],
                    prepare: () => this.trigger(this.model.Events.ITEM_CHANGE_INITIATED, { gallery: this, next: o }),
                    update: (e) => {
                        e > 0.5 && !a && ((a = !0), (this.currentIndex = o.index), this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, { gallery: this, current: o })), (o.opacity = e);
                    },
                    draw: () => {},
                    finish: () => {
                        this.trigger(this.model.Events.ITEM_CHANGE_COMPLETED, { gallery: this, current: o });
                    },
                })),
                    this.clip.play().then(() => {
                        this.clip.destroy(), (this.clip = null);
                    });
            },
            onResizeImmediate() {
                this.clip && (this.clip.destroy(), (this.clip = null)), this.resetFadeItems();
            },
            resetFadeItems() {
                this._items.forEach((e) => {
                    (e.zIndex = e === this.currentItem ? 2 : 0), (e.opacity = 1);
                });
            },
            destroy() {
                this.clip && this.clip.destroy(), this.resetFadeItems();
            },
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(156),
            n = function () {
                this.events = {};
            },
            r = n.prototype;
        (r.requestAnimationFrame = function (e) {
            return this.events[e] || (this.events[e] = new s(e)), this.events[e].requestAnimationFrame;
        }),
            (r.cancelAnimationFrame = function (e) {
                return this.events[e] || (this.events[e] = new s(e)), this.events[e].cancelAnimationFrame;
            }),
            (e.exports = new n());
    },
    function (e, t, i) {
        "use strict";
        const s = ["INPUT", "SELECT", "TEXTAREA"];
        e.exports = {
            created() {
                (this.handleIntersect = this.handleIntersect.bind(this)),
                    (this.onKeyDown = this.onKeyDown.bind(this)),
                    (this.observer = new IntersectionObserver(this.handleIntersect)),
                    this.observer.observe(this.el),
                    (this.isInView = !1);
            },
            destroy() {
                window.removeEventListener("keydown", this.onKeyDown), this.observer.disconnect(), (this.observer = null), (this.isInView = !1);
            },
            handleIntersect(e) {
                e.forEach((e) => {
                    (this.isInView = e.isIntersecting), e.isIntersecting ? window.addEventListener("keydown", this.onKeyDown) : window.removeEventListener("keydown", this.onKeyDown);
                });
            },
            onKeyDown(e) {
                if ((37 !== e.keyCode && 39 !== e.keyCode) || this.inputHasFocus()) return;
                let t = this.model.IsRTL ? -1 : 1,
                    i = 37 === e.keyCode ? -1 : 1;
                this.lastInteractionEvent = e;
                const s = this.currentIndex + i * t;
                this.animateToItem(s);
            },
            inputHasFocus: function () {
                return -1 !== s.indexOf(document.activeElement.nodeName);
            },
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            onItemChangeOccurred(e) {
                const { previous: t, current: i } = this.selections.occurred;
                t && t !== i && t.deselect(), i.select();
            },
        };
    },
    function (e, t, i) {
        "use strict";
        let s;
        try {
            s = i(170).observer.Gallery;
        } catch (e) {}
        e.exports = {
            created(e) {
                this.analytics = {
                    lastTrackedItem: null,
                    observer: null,
                    name: this.el.getAttribute("data-analytics-gallery-id") || this.el.getAttribute("id"),
                    events: { UPDATE: "update", UPDATE_COMPLETE: "update:complete" },
                };
            },
            mounted() {
                s &&
                    (name || (console.warn("No ID attribute found on the Mixin Gallery element - please add an ID", this), (name = "null")),
                    (this.analytics.observer = new s(this, {
                        galleryName: this.analytics.name,
                        beforeUpdateEvent: this.analytics.events.UPDATE,
                        afterUpdateEvent: this.analytics.events.UPDATE_COMPLETE,
                        trackAutoRotate: !0,
                    })));
            },
            onItemChangeCompleted(e) {
                if (!e.previous || e.current === this.analytics.lastTrackedItem || (e.current === e.previous && !this.analytics.lastTrackedItem)) return;
                this.analytics.lastTrackedItem = e.current;
                let t = { incoming: { id: e.current.analyticsId }, outgoing: { id: e.previous.analyticsId }, interactionEvent: this.lastInteractionEvent };
                this.trigger(this.analytics.events.UPDATE_COMPLETE, t);
            },
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.pluginCache = t.default = void 0);
        var n = s(i(12)),
            r = s(i(176)),
            o = s(i(181)),
            a = s(i(16));
        const l = {};
        t.pluginCache = l;
        const h = [];
        let c = 1;
        class u extends n.default {
            constructor() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                super(), (this.el = e.el || document.createElement("video")), (this.id = e.id || this.el.id || this.el.dataset.inlineMediaId || "inlineMedia-" + c++);
                const t = (e.plugins || []).concat(r.default);
                this._initPlugins(t, e), h.push(this);
            }
            async load(e) {
                for (const t of this.plugins) if ("function" == typeof t.load) return t.load(e);
            }
            abortLoad() {
                for (const e of this.plugins)
                    if ("function" == typeof e.abortLoad) {
                        e.abortLoad();
                        break;
                    }
            }
            async play() {
                for (const e of this.plugins) if ("function" == typeof e.play) return e.play();
            }
            get src() {
                for (const e of this.plugins) if (e.src) return e.src;
                return "";
            }
            get playbackState() {
                for (const e of this.plugins) {
                    const t = e.playbackState;
                    if (void 0 !== t) return t;
                }
            }
            get loadingState() {
                for (const e of this.plugins) {
                    const t = e.loadingState;
                    if (void 0 !== t) return t;
                }
            }
            _initPlugins(e, t) {
                (this.plugins = []), (this.pluginMap = new Map());
                for (let i of e) {
                    if ("string" == typeof i) {
                        if (!l[i]) throw new Error(`Trying to use undefined Plugin named: ${i} . Ensure you call Media.addPlugin() first!`);
                        i = l[i];
                    }
                    if (!1 !== i.isSupported) {
                        const e = new i(Object.assign({ media: this }, t));
                        this.plugins.push(e), this.pluginMap.set(i, e);
                    }
                }
                this.trigger(a.default.MOUNTED);
            }
            destroy() {
                if (!this._destroyed) {
                    for (const e of this.plugins) "function" == typeof e.destroy && e.destroy();
                    super.destroy(), h.splice(h.indexOf(this), 1), (this._destroyed = !0);
                }
            }
            static get medias() {
                return h;
            }
            static addPlugin(e, t) {
                l[e] = t;
            }
            static async autoInitialize() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document,
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return (0, o.default)(e, t);
            }
        }
        var d = u;
        t.default = d;
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        t.default = {
            LOAD_START: "loadstart",
            LOADED_DATA: "loadeddata",
            LOADED_METADATA: "loadedmetadata",
            CAN_PLAY: "canplay",
            CAN_PLAY_THROUGH: "canplaythrough",
            PLAY: "play",
            PLAYING: "playing",
            PAUSE: "pause",
            WAITING: "waiting",
            SEEKING: "seeking",
            SEEKED: "seeked",
            ERROR: "error",
            ENDED: "ended",
            ABORT: "abort",
        };
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = function (e, t, i, s) {
                const n = i[0].toUpperCase() + i.slice(1),
                    r = e["inlineMedia" + n];
                if (void 0 !== r)
                    switch (typeof s) {
                        case "boolean":
                            return "false" !== r;
                        case "object":
                            return JSON.parse(r);
                        case "number":
                            return Number(r);
                        default:
                            return r;
                    }
                else if (void 0 !== t[i]) {
                    const e = t[i];
                    return "boolean" != typeof s || ("false" !== e && "true" !== e) ? e : "false" !== e;
                }
                return s;
            });
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(16)),
            r = s(i(106)),
            o = s(i(8));
        const a = { start: "t - 100vh", end: "b" };
        class l extends o.default {
            constructor(e) {
                super(e),
                    (this._anim = e.anim),
                    (this._container = e.container || this.media.el.parentElement),
                    (this._scrollGroup = this.options.scrollGroup || this._anim.getGroupForTarget(this._container || this.media.el)),
                    this._initialize();
            }
            _initialize() {
                (this._onPlayKeyframeEnter = this._onPlayKeyframeEnter.bind(this)), (this._onPlayKeyframeExit = this._onPlayKeyframeExit.bind(this));
                const e = this.media.el.dataset;
                if (((this._autoPlayWithReducedMotion = (0, r.default)(e, this.options, "autoPlayWithReducedMotion", !1)), !this._autoPlayWithReducedMotion && l.prefersReducedMotion)) return;
                (this._pauseOnExit = (0, r.default)(e, this.options, "pauseOnExit", !1)), (this._resetOnExit = (0, r.default)(e, this.options, "resetOnExit", !1));
                const t = (0, r.default)(e, this.options, "playKeyframe", a);
                t.event || (t.event = "inline-media-play-kf"),
                    (this._playKeyframe = this._scrollGroup.addKeyframe(this.media.el, t)),
                    this._playKeyframe.controller.on(`${this._playKeyframe.event}:enter`, this._onPlayKeyframeEnter),
                    this._playKeyframe.controller.on(`${this._playKeyframe.event}:exit`, this._onPlayKeyframeExit),
                    (this._onLoadStart = this._onLoadStart.bind(this)),
                    this.media.on(n.default.MEDIA_LOAD_START, this._onLoadStart);
            }
            _onLoadStart() {
                this._loaded = !1;
            }
            async _onPlayKeyframeEnter(e) {
                if (((this._inFrame = !0), !this._paused && (this._loaded || (await this.media.load(), (this._loaded = !0)), this._inFrame)))
                    try {
                        await this.media.play();
                    } catch (e) {}
            }
            _onPlayKeyframeExit(e) {
                (this._inFrame = !1),
                    this._loaded && this.media.el.paused && !this.media.el.ended ? (this._paused = !0) : this._pauseOnExit && ((this._paused = !1), this.media.el.pause()),
                    this._loaded && this._resetOnExit && (this.media.el.currentTime = 0);
            }
            get playKeyframe() {
                return this._playKeyframe;
            }
            destroy() {
                this._playKeyframe.controller.off(`${this._playKeyframe.event}:enter`, this._onPlayKeyframeEnter),
                    this._playKeyframe.controller.off(`${this._playKeyframe.event}:exit`, this._onPlayKeyframeExit),
                    this.media.off(n.default.MEDIA_LOAD_START, this._onLoadStart),
                    super.destroy();
            }
            static get prefersReducedMotion() {
                return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            }
        }
        t.default = l;
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(190));
        t.default = class {
            constructor(e) {
                (this._breakpoints = e.breakpoints || n.default), (this.options = e), this._initialize();
            }
            _initialize() {
                (this._updateBreakpoint = this._updateBreakpoint.bind(this)),
                    (this._callback = this.options.callback),
                    (this._mediaQueries = Object.keys(this._breakpoints).map((e) => window.matchMedia(`(min-width: ${this._breakpoints[e]}px)`))),
                    this._addEventListeners(),
                    this._updateBreakpoint();
            }
            _addEventListeners() {
                for (const e of this._mediaQueries) e.addListener(this._updateBreakpoint);
            }
            _removeEventListeners() {
                for (const e of this._mediaQueries) e.removeListener(this._updateBreakpoint);
            }
            _updateBreakpoint() {
                const e = Object.keys(this._breakpoints);
                let t = e[0];
                for (let i = 1; i < e.length; i++) {
                    if (!this._mediaQueries[i].matches) break;
                    t = e[i];
                }
                let i = !1;
                this._currentBreakpoint && this._currentBreakpoint !== t && (i = !0), (this._currentBreakpoint = t), i && this._callback();
            }
            get breakpoint() {
                return this._currentBreakpoint;
            }
            destroy() {
                this._removeEventListeners();
            }
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            var i;
            return t ? { width: (i = e.getBoundingClientRect()).width, height: i.height } : { width: e.offsetWidth, height: e.offsetHeight };
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = { createBezier: i(111), createPredefined: i(235), createStep: i(112), Ease: i(55) };
    },
    function (e, t, i) {
        "use strict";
        i(233);
        var s = i(55),
            n = i(234),
            r = "Bezier curve expects exactly four (4) numbers. Given: ";
        e.exports = function (e, t, i, o) {
            var a = Array.prototype.slice.call(arguments),
                l = a.every(function (e) {
                    return "number" == typeof e;
                });
            if (4 !== a.length || !l) throw new TypeError(r + a);
            var h = new n(e, t, i, o),
                c = function (e, t, i, s) {
                    return h.get(e / s) * i + t;
                },
                u = "cubic-bezier(" + a.join(", ") + ")";
            return new s(c, u);
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(55);
        e.exports = function (e, t) {
            if (((t = t || "end"), "number" != typeof e || e < 1)) throw new TypeError("Step function expects a numeric value greater than zero. Given: " + e);
            if ("start" !== t && "end" !== t) throw new TypeError('Step function direction must be either "start" or "end" (default). Given: ' + t);
            return new s(function (i, s, n, r) {
                return s + (n / e) * Math["start" === t ? "floor" : "ceil"]((i / r) * e);
            }, "steps(" + e + ", " + t + ")");
        };
    },
    function (e, t, i) {
        "use strict";
        var s;
        i(239), i(114);
        var n = i(3).EventEmitterMicro;
        new Date().getTime();
        function r() {
            n.call(this),
                (this.lastFrameTime = null),
                (this._animationFrame = null),
                (this._active = !1),
                (this._startTime = null),
                (this._boundOnAnimationFrame = this._onAnimationFrame.bind(this)),
                (this._getTime =
                    Date.now ||
                    function () {
                        return new Date().getTime();
                    });
        }
        ((s = r.prototype = new n(null)).start = function () {
            this._active || this._tick();
        }),
            (s.stop = function () {
                this._active && window.cancelAnimationFrame(this._animationFrame), (this._animationFrame = null), (this.lastFrameTime = null), (this._active = !1);
            }),
            (s.destroy = function () {
                var e;
                for (e in (this.stop(), this.off(), this)) this.hasOwnProperty(e) && (this[e] = null);
            }),
            (s.isRunning = function () {
                return this._active;
            }),
            (s._tick = function () {
                this._active || (this._active = !0), (this._animationFrame = window.requestAnimationFrame(this._boundOnAnimationFrame));
            }),
            (s._onAnimationFrame = function (e) {
                null === this.lastFrameTime && (this.lastFrameTime = e);
                var t = e - this.lastFrameTime,
                    i = 0;
                if ((t >= 1e3 && (t = 0), 0 !== t && (i = 1e3 / t), !0 === this._firstFrame && ((t = 0), (this._firstFrame = !1)), 0 === i)) this._firstFrame = !0;
                else {
                    var s = { time: e, delta: t, fps: i, naturalFps: i, timeNow: this._getTime() };
                    this.trigger("update", s), this.trigger("draw", s);
                }
                (this._animationFrame = null), (this.lastFrameTime = e), !1 !== this._active ? this._tick() : (this.lastFrameTime = null);
            }),
            (e.exports = r);
    },
    function (e, t) {},
    function (e, t, i) {
        "use strict";
        var s = i(113);
        e.exports = new s();
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, i) {
        e.exports = i(135);
    },
    function (e, t, i) {
        "use strict";
        const s = i(63),
            n = i(43),
            r = i(136),
            o = i(97),
            a = i(21).PictureLazyLoading,
            l = i(138),
            h = "enhance-xp";
        ({
            initialize() {
                s.detect();
                const e = document.documentElement;
                e.classList.contains("text-zoom") && (e.classList.remove(h), e.classList.add("no-enhance-xp"));
                const t = document.querySelector(".main");
                Object.assign(o, l);
                const i = new r(t, { anim: n });
                i.anim.on(n.model.EVENTS.ON_DOM_GROUPS_CREATED, () => {
                    new a();
                }),
                    i.addComponent({ componentName: "ReBase", el: document.body }),
                    i.addComponent({ componentName: "AXFocusManager", el: document.body });
            },
        }.initialize());
    },
    function (e, t, i) {
        "use strict";
        const s = i(3).EventEmitterMicro,
            n = i(137),
            r = i(97),
            o = {};
        class a extends s {
            constructor(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (!t.anim) throw "Anim is no longer bundled with BubbleGum. Please pass Anim when initialize BubbleGum: `new BubbleGum(document.querySelector('main'), {anim: AnimSystem})`";
                super(),
                    (this.el = e),
                    (this.anim = t.anim),
                    (this.componentAttribute = t.attribute || "data-component-list"),
                    (this.components = []),
                    (this.componentsInitialized = !1),
                    this.el.getAttribute("data-anim-scroll-group") || this.el.setAttribute("data-anim-scroll-group", "bubble-gum-group"),
                    n.add(() => {
                        this.anim.initialize().then(() => {
                            this.initComponents(), this.setupEvents(), this.components.forEach((e) => e.mounted()), this.trigger(a.EVENTS.DOM_COMPONENTS_MOUNTED);
                        });
                    });
            }
            initComponents() {
                const e = Array.prototype.slice.call(this.el.querySelectorAll(`[${this.componentAttribute}]`));
                this.el.hasAttribute(this.componentAttribute) && e.push(this.el);
                for (let t = 0; t < e.length; t++) {
                    let i = e[t],
                        s = i.getAttribute(this.componentAttribute).split(" ");
                    for (let e = 0, t = s.length; e < t; e++) {
                        let t = s[e];
                        "" !== t && " " !== t && this.addComponent({ el: i, componentName: t });
                    }
                }
                this.componentsInitialized = !0;
            }
            setupEvents() {
                (this.onResizeDebounced = this.onResizeDebounced.bind(this)),
                    (this.onResizeImmediate = this.onResizeImmediate.bind(this)),
                    (this.onBreakpointChange = this.onBreakpointChange.bind(this)),
                    this.anim.on(this.anim.model.PageEvents.ON_RESIZE_IMMEDIATE, this.onResizeImmediate),
                    this.anim.on(this.anim.model.PageEvents.ON_RESIZE_DEBOUNCED, this.onResizeDebounced),
                    this.anim.on(this.anim.model.PageEvents.ON_BREAKPOINT_CHANGE, this.onBreakpointChange);
            }
            addComponent(e) {
                const { el: t, componentName: i, data: s } = e;
                if (!r.hasOwnProperty(i)) throw "BubbleGum::addComponent could not add component to '" + t.className + "'. No component type '" + i + "' found!";
                const n = r[i];
                if (!a.componentIsSupported(n, i))
                    return void 0 === o[i] && (console.log("BubbleGum::addComponent unsupported component '" + i + "'. Reason: '" + i + ".IS_SUPPORTED' returned false"), (o[i] = !0)), null;
                let l = t.dataset.componentList || "";
                l.includes(i) || (t.dataset.componentList = l.split(" ").concat(i).join(" "));
                let h = new n({ el: t, data: s, componentName: e.componentName, gum: this, pageMetrics: this.anim.model.pageMetrics });
                return this.components.push(h), this.componentsInitialized && h.mounted(), h;
            }
            removeComponent(e) {
                const t = this.components.indexOf(e);
                -1 !== t &&
                    (this.components.splice(t, 1),
                    (e.el.dataset.componentList = e.el.dataset.componentList
                        .split(" ")
                        .filter((t) => t !== e.componentName)
                        .join(" ")),
                    e.destroy());
            }
            getComponentOfType(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document.documentElement;
                const i = `[${this.componentAttribute}*=${e}]`,
                    s = t.matches(i) ? t : t.querySelector(i);
                return s ? this.components.find((t) => t instanceof r[e] && t.el === s) : null;
            }
            getComponentsOfType(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document.documentElement;
                const i = `[${this.componentAttribute}*=${e}]`,
                    s = t.matches(i) ? [t] : Array.from(t.querySelectorAll(i));
                return this.components.filter((t) => t instanceof r[e] && s.includes(t.el));
            }
            getComponentsForElement(e) {
                return this.components.filter((t) => t.el === e);
            }
            onResizeImmediate() {
                this.components.forEach((e) => e.onResizeImmediate(this.anim.model.pageMetrics));
            }
            onResizeDebounced() {
                this.components.forEach((e) => e.onResizeDebounced(this.anim.model.pageMetrics));
            }
            onBreakpointChange() {
                this.components.forEach((e) => e.onBreakpointChange(this.anim.model.pageMetrics));
            }
            static componentIsSupported(e, t) {
                const i = e.IS_SUPPORTED;
                if (void 0 === i) return !0;
                if ("function" != typeof i) return console.error('BubbleGum::addComponent error in "' + t + '".IS_SUPPORTED - it should be a function which returns true/false'), !0;
                const s = e.IS_SUPPORTED();
                return void 0 === s ? (console.error('BubbleGum::addComponent error in "' + t + '".IS_SUPPORTED - it should be a function which returns true/false'), !0) : s;
            }
        }
        (a.EVENTS = { DOM_COMPONENTS_MOUNTED: "DOM_COMPONENTS_MOUNTED" }), (e.exports = a);
    },
    function (e, t, i) {
        "use strict";
        let s = !1,
            n = !1,
            r = [],
            o = -1;
        e.exports = {
            NUMBER_OF_FRAMES_TO_WAIT: 30,
            add: function (e) {
                if ((n && e(), r.push(e), s)) return;
                s = !0;
                let t = document.documentElement.scrollHeight,
                    i = 0;
                const a = () => {
                    let e = document.documentElement.scrollHeight;
                    if (t !== e) i = 0;
                    else if ((i++, i >= this.NUMBER_OF_FRAMES_TO_WAIT)) return void r.forEach((e) => e());
                    (t = e), (o = requestAnimationFrame(a));
                };
                o = requestAnimationFrame(a);
            },
            reset() {
                cancelAnimationFrame(o), (s = !1), (n = !1), (r = []);
            },
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            AnimatePins: i(139),
            AXFocusManager: i(140),
            ColornavGallery: i(141),
            DesignHero: i(171),
            Finishes: i(172),
            Hero: i(173),
            InlineMedia: i(174),
            Modal: i(195),
            PerformanceGallery: i(222),
            ReBase: i(245),
            StickyColornav: i(246),
            VideoScroll: i(247),
        };
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.AnimatePins = void 0);
        const s = i(6);
        class n extends s {
            constructor(e) {
                super(e),
                    (this.pins = this.el.querySelectorAll(".pin")),
                    (this.pinProgress = 0),
                    (this.thunderboltProngs = this.el.querySelector(".pin-thunderbolt .pin-prongs")),
                    (this.thunderboltProgress = 0),
                    (this.pinCaptions = this.el.querySelectorAll(".pin-caption")),
                    (this.hardware = { left: this.el.querySelector(".overview-connectivity-connectivity-1"), right: this.el.querySelector(".overview-connectivity-connectivity-2") });
            }
            mounted() {
                this.hardwareTween(), this.pinLineScaling(), this.pinCaptionFade(), this.reBaseCleanup();
            }
            hardwareTween() {
                let e = "t - 100vh + css(--tween-offset-start)",
                    t = "t - 50vh + css(--tween-offset-end)",
                    i = "a0t - 100vh + css(--tween-offset-start)",
                    s = "a0t - 50vh + css(--tween-offset-end)",
                    n = { cssClass: "js-will-change", toggle: "true", disabledWhen: ["no-enhance-xp"] };
                this.anim.addKeyframe(this.hardware.right, { start: e, end: t, x: [100, 0] }),
                    this.anim.addKeyframe(this.hardware.left, { start: i, end: s, x: [-100, 0], anchors: [this.hardware.right] }),
                    this.anim.addKeyframe(this.hardware.right, { start: `${e} - 100vh`, end: `${t} + 100vh`, ...n }),
                    this.anim.addKeyframe(this.hardware.left, { start: `${i} - 100vh`, end: `${s} + 100vh`, anchors: [this.hardware.right], ...n });
            }
            pinLineScaling() {
                this.anim
                    .addKeyframe(this.el, { start: "t - 50vh + css(--tween-line-offset-start)", end: "t - 50vh + css(--tween-line-offset-end)", progress: [0, 100] })
                    .controller.on("draw", (e) => {
                        (this.pinProgress = e.tweenProps.progress.current / 100),
                            this.pins.forEach((e) => {
                                e.classList.contains("pin-thunderbolt") ? this.prongedPinsAnimation(e, this.thunderboltProngs) : e.style.setProperty("--pin-scroll-scale", this.pinProgress);
                            });
                    });
            }
            prongedPinsAnimation(e, t) {
                (this.thunderboltProgress = 3 * this.pinProgress),
                    this.prongedPinScaling(e, 0, "--pin-scroll-scale"),
                    this.prongedPinScaling(t, 1, "--pin-prong-base-scroll-scale"),
                    this.prongedPinScaling(t, 2, "--pin-prong-scroll-scale");
            }
            prongedPinScaling(e, t, i) {
                this.thunderboltProgress > 0 + t && this.thunderboltProgress < 1 + t
                    ? e.style.setProperty(i, this.thunderboltProgress - t)
                    : this.thunderboltProgress < 1 + t
                    ? e.style.setProperty(i, 0)
                    : e.style.setProperty(i, 1);
            }
            pinCaptionFade() {
                this.pinCaptions.forEach((e) => {
                    this.anim.addKeyframe(e, { start: "a0t - 55vh + css(--tween-offset-start)", end: "a0t - 45vh + css(--tween-offset-end)", opacity: [0, 1], anchors: [this.el] });
                });
            }
            reBaseCleanup() {
                let e = this.gum.getComponentOfType("ReBase", document.body);
                e.on(e.EVT_REBASE, () => {
                    this.pins.forEach((e) => {
                        e.style.setProperty("--pin-scroll-scale", 1);
                    }),
                        this.thunderboltProngs.style.setProperty("--pin-prong-scroll-scale", 1),
                        this.thunderboltProngs.style.setProperty("--pin-prong-base-scroll-scale", 1);
                });
            }
            static IS_SUPPORTED() {
                return document.documentElement.classList.contains("enhance-xp");
            }
        }
        (t.AnimatePins = n), (e.exports = n);
    },
    function (e, t, i) {
        "use strict";
        var s = i(0)(i(6));
        class n extends s.default {
            constructor() {
                super(...arguments),
                    (this._els = this.el.querySelectorAll("[data-vo]")),
                    (this._handleFocus = this._handleFocus.bind(this)),
                    (this._onPressDown = this._onPressDown.bind(this)),
                    (this._onRelease = this._onRelease.bind(this));
            }
            get name() {
                return "AXFocusManager";
            }
            mounted() {
                this._setTabIndex(), this._addListeners();
                const e = this.gum.getComponentOfType("ReBase", document.body);
                e.on(e.EVT_REBASE, () => {
                    this.destroy();
                });
            }
            _addListeners() {
                this.el.addEventListener("focusin", this._handleFocus),
                    this.el.addEventListener("mousedown", this._onPressDown),
                    this.el.addEventListener("mouseup", this._onRelease),
                    this.el.addEventListener("touchstart", this._onPressDown),
                    this.el.addEventListener("touchend", this._onRelease);
            }
            _removeListeners() {
                this.el.removeEventListener("focusin", this._handleFocus),
                    this.el.removeEventListener("mousedown", this._onPressDown),
                    this.el.removeEventListener("mouseup", this._onRelease),
                    this.el.removeEventListener("touchstart", this._onPressDown),
                    this.el.removeEventListener("touchend", this._onRelease);
            }
            _onPressDown() {
                this._pressDown = !0;
            }
            _onRelease() {
                this._pressDown = !1;
            }
            _setTabIndex() {
                this._els.forEach((e) => {
                    let t = -1;
                    e.hasAttribute("data-ax-tabindex") && (t = e.dataset.axTabindex), e.setAttribute("tabindex", t);
                });
            }
            _removeTabIndex() {
                this._els.forEach((e) => e.removeAttribute("tabindex"));
            }
            _handleFocus(e) {
                const t = e.target;
                if (this._pressDown) return;
                let i = t.dataset,
                    s = document.querySelector(i.axScrollAnchor) || t,
                    n = t.hasAttribute("data-ax-attribute-end"),
                    r = i.axAttribute || ".fade-in",
                    o = i.axOffset || 0,
                    a = i.axKeyframeNumber || 0;
                if (s._animInfo) {
                    let e = this.gum.anim.getControllerForTarget(s),
                        i = e.getNearestKeyframeForAttribute(r, a);
                    if (!i) return void console.warn(`no keyframe is found for attribute: "${r}" at keyframeNumber: ${a}, available keyframes:`, e.keyframes);
                    let l = ExpressionParser.parse(`${i.jsonProps[n ? "end" : "start"]} + ${o}`, { target: t, anchors: i.anchors });
                    window.scrollTo(0, Math.round(l)), "-1" === t.getAttribute("tabindex") && t.blur();
                }
            }
            destroy() {
                this._removeTabIndex(), this._removeListeners(), super.destroy();
            }
            static IS_SUPPORTED() {
                return document.documentElement.classList.contains("enhance-xp") && !document.documentElement.classList.contains("touch");
            }
        }
        e.exports = n;
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.ColornavGallery = void 0);
        const s = i(6),
            n = i(98),
            r = (i(153), i(99)),
            o = i(168),
            a = i(169),
            l = i(101),
            h = i(102),
            c = i(103);
        class u extends s {
            constructor(e) {
                if ((super(e), this.el.dataset.componentSupport && !document.documentElement.classList.contains(this.el.dataset.componentSupport))) return void this.el.classList.add("static-gallery");
                const t = {
                        beforeCreate() {
                            (this.model.PrefersReducedMotion = document.documentElement.classList.contains("reduced-motion")),
                                (this.model.IsRTL = "rtl" === document.documentElement.getAttribute("dir")),
                                (this.model.IsTouch = "ontouchstart" in document.documentElement),
                                (this.model.Fade.duration = 0),
                                (this.model.TabNav.ItemSelector = ".colornav-wrapper li");
                        },
                    },
                    i = n.withMixins(t, r, a, l, o, h, c),
                    s = this.el;
                try {
                    new i({ el: s });
                } catch (e) {
                    console.error(e);
                }
            }
        }
        (t.ColornavGallery = u), (e.exports = u);
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            PrefersReducedMotion: !1,
            IsRTL: !1,
            IsTouch: !1,
            Slide: { Selector: ".item-container", duration: 1 },
            Fade: { duration: 0.5 },
            Item: { Selector: ".item-container .gallery-item", ConstructorFunction: i(143) },
            DotNav: { Selector: ".dotnav" },
            PaddleNav: { Selector: ".paddlenav" },
            ChapterPlayer: { defaultEase: (e) => e },
            FadeCaptionOnChange: { ItemSelector: ".captions-gallery [data-captions-gallery-item]" },
            TabNav: { ItemSelector: ".tablist-wrapper li", RoamingTabIndexSelector: "a" },
            SwipeDetect: { DesktopSwipe: !1, LimitIndexChange: !1, movementRateMultiplier: 1.5, velocityMultiplier: 8 },
            SwipeDrag: { DesktopSwipe: !1, movementRateMultiplier: 1.5, velocityMultiplier: 8 },
            InitialIndexFromHashLink: { Enabled: !1, ScrollReset: !1 },
            Theme: { classPrefix: "theme" },
            Events: { ITEM_CHANGE_INITIATED: "ITEM_CHANGE_INITIATED", ITEM_CHANGE_OCCURRED: "ITEM_CHANGE_OCCURRED", ITEM_CHANGE_COMPLETED: "ITEM_CHANGE_COMPLETED" },
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(3).EventEmitterMicro,
            n = {};
        "undefined" != typeof window && ((n.draw = i(11)), (n.cancelDraw = i(144)));
        e.exports = class extends s {
            constructor(e) {
                super(),
                    (this.index = e.index),
                    (this.el = e.el),
                    (this._x = 0),
                    (this._y = 0),
                    (this._opacity = 0),
                    (this._width = 0),
                    (this._height = 0),
                    (this._zIndex = 0),
                    (this.id = this.el.getAttribute("id")),
                    (this.analyticsId = this.el.getAttribute("data-analytics-gallery-item-id") || this.el.getAttribute("id")),
                    (this.applyDraw = this.applyDraw.bind(this)),
                    this.measure();
            }
            measure() {
                const e = getComputedStyle(this.el);
                (this._width = this.el.clientWidth),
                    (this._height = this.el.clientHeight),
                    (this._zIndex = parseInt(e.getPropertyValue("z-index"))),
                    (this._opacity = parseFloat(e.getPropertyValue("opacity")));
            }
            select() {
                this.el.classList.add("current"), this.trigger("select", this);
            }
            deselect() {
                this.el.classList.remove("current"), this.trigger("deselect", this);
            }
            progress(e) {}
            needsRedraw() {
                n.cancelDraw(this._rafID), (this._rafID = n.draw(this.applyDraw, !0));
            }
            applyDraw() {
                (this.el.style.zIndex = this._zIndex), (this.el.style.opacity = this._opacity), (this.el.style.transform = `translate(${this._x}px, ${this._y}px)`);
            }
            get height() {
                return this._height;
            }
            set height(e) {
                (this._height = e), this.needsRedraw();
            }
            get width() {
                return this._width;
            }
            set width(e) {
                (this._width = e), this.needsRedraw();
            }
            get x() {
                return this._x;
            }
            set x(e) {
                (this._x = e), this.needsRedraw();
            }
            get y() {
                return this._y;
            }
            set y(e) {
                (this._y = e), this.needsRedraw();
            }
            get opacity() {
                return this._opacity;
            }
            set opacity(e) {
                (this._opacity = e), this.needsRedraw();
            }
            get zIndex() {
                return this._zIndex;
            }
            set zIndex(e) {
                (this._zIndex = e), this.needsRedraw();
            }
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(9);
        e.exports = s.cancelAnimationFrame("draw");
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            beforeCreate() {
                Object.defineProperties(this, { currentItem: { configurable: !0, get: () => this._items[this.wrappedIndex(this.currentIndex)] } });
            },
            wrappedIndex(e) {
                return (e %= this._items.length) < 0 ? this._items.length + e : e;
            },
            getItemForTrigger(e) {
                return this._items.find((t) => t.id === e);
            },
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            itemsCreated(e) {
                this.model.options.gum ||
                    this._isVue ||
                    (this.anim.on("ON_RESIZE_IMMEDIATE", this.onResizeImmediate),
                    this.anim.on("ON_RESIZE_DEBOUNCED", this.onResizeDebounced),
                    this.anim.on("ON_BREAKPOINT_CHANGE", this.onBreakpointChange),
                    requestAnimationFrame(this.mounted));
            },
            destroy() {
                this.model.options.gum ||
                    this._isVue ||
                    (this.anim.off("ON_RESIZE_IMMEDIATE", this.onResizeImmediate),
                    this.anim.off("ON_RESIZE_DEBOUNCED", this.onResizeDebounced),
                    this.anim.off("ON_BREAKPOINT_CHANGE", this.onBreakpointChange));
            },
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            beforeCreate() {
                document.body._animInfo && ((this.anim = document.body._animInfo.group.anim), (this.model.pageMetrics = this.anim.model.pageMetrics));
            },
            addKeyframe(e) {
                const t = e.el || this.el;
                return (e.group || this.anim).addKeyframe(t, e);
            },
            addDiscreteEvent(e) {
                e.event = e.event || "Generic-Event-Name-" + tmpUUID++;
                let t = void 0 !== e.end && e.end !== e.start;
                const i = this.addKeyframe(e);
                return (
                    t
                        ? (e.onEnterOnce && i.controller.once(e.event + ":enter", e.onEnterOnce),
                          e.onExitOnce && i.controller.once(e.event + ":exit", e.onExitOnce),
                          e.onEnter && i.controller.on(e.event + ":enter", e.onEnter),
                          e.onExit && i.controller.on(e.event + ":exit", e.onExit))
                        : (e.onEventOnce && i.controller.once(e.event, e.onEventOnce),
                          e.onEventReverseOnce && i.controller.once(e.event + ":reverse", e.onEventReverseOnce),
                          e.onEvent && i.controller.on(e.event, e.onEvent),
                          e.onEventReverse && i.controller.on(e.event + ":reverse", e.onEventReverse)),
                    i
                );
            },
            addRAFLoop(e) {
                let t = ["start", "end"];
                if (!t.every((t) => e.hasOwnProperty(t))) return void console.log("BubbleGum.BaseComponent::addRAFLoop required options are missing: " + t.join(" "));
                const i = new RAFEmitter.create();
                i.on("update", e.onUpdate || noop), i.on("draw", e.onDraw || noop), i.on("draw", () => i.run());
                const { onEnter: s, onExit: n } = e;
                return (
                    (e.onEnter = () => {
                        i.run(), s && s();
                    }),
                    (e.onExit = () => {
                        i.cancel(), n && n();
                    }),
                    this.addDiscreteEvent(e)
                );
            },
            addContinuousEvent(e) {
                e.onDraw || console.log("BubbleGum.BaseComponent::addContinuousEvent required option `onDraw` is missing. Consider using a regular keyframe if you do not need a callback"),
                    (e.event = e.event || "Generic-Event-Name-" + tmpUUID++);
                let t = this.addKeyframe(e);
                return t.controller.on(e.event, e.onDraw), t;
            },
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            beforeCreate() {
                this.selections = { initiated: { current: null, previous: null }, occurred: { current: null, previous: null }, completed: { current: null, previous: null } };
            },
            onItemChangeInitiated(e) {
                (this.selections.initiated.previous = this.selections.initiated.current),
                    (this.selections.initiated.current = this.selections.initiated.next),
                    (this.selections.initiated.next = e.next);
            },
            onItemChangeOccurred(e) {
                (this.selections.occurred.previous = e.previous = this.selections.occurred.current), (this.selections.occurred.current = e.current);
            },
            onItemChangeCompleted(e) {
                (this.selections.completed.previous = e.previous = this.selections.completed.current), (this.selections.completed.current = e.current);
            },
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            createItems(e) {
                if (this._items.length) this.itemsCreated();
                else {
                    if (!this.model.Item.ConstructorFunction) throw new ReferenceError("MixinGallery::AutoCreateItems - this.model.Item.ConstructorFunction is null");
                    if (0 === this._items.length) {
                        (this._items = []),
                            Array.from(this.el.querySelectorAll(this.model.Item.Selector)).forEach((e, t) => {
                                const i = new this.model.Item.ConstructorFunction({ el: e, index: t });
                                this._items.push(i);
                            });
                        let e = this._items[this._items.length - 1];
                        for (let t = 0; t < this._items.length; t++) {
                            const i = this._items[t];
                            (i.prev = e), (i.next = this._items[t + 1]), (e = i);
                        }
                        e.next = this._items[0];
                    }
                    this.itemsCreated();
                }
            },
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            mounted() {
                const e = this._items[this.wrappedIndex(this.currentIndex)],
                    t = this;
                this.trigger(this.model.Events.ITEM_CHANGE_INITIATED, { gallery: t, next: e }),
                    this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, { gallery: t, current: e }),
                    this.trigger(this.model.Events.ITEM_CHANGE_COMPLETED, { gallery: t, current: e });
            },
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(38),
            n = i(39);
        e.exports = {
            itemsCreated(e) {
                this._items.forEach((e, t) => {
                    t === this.wrappedIndex(this.currentIndex) ? n(e.el) : s(e.el);
                });
            },
            onItemChangeCompleted(e) {
                const { previous: t, current: i } = this.selections.completed;
                t && t !== i && s(t.el), n(i.el);
            },
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            itemsCreated() {
                if (!this.model.InitialIndexFromHashLink.Enabled || !this._items) return;
                const e = location.hash.slice(1);
                if (!e) return;
                const t = this._items.findIndex((t) => {
                    let { id: i } = t;
                    return i === e;
                });
                t > -1 && ((this.currentIndex = t), this.model.InitialIndexFromHashLink.ScrollReset && this._resetHorizontalScrollPosition());
            },
            _resetHorizontalScrollPosition(e) {
                const t = e || this.el;
                0 !== t.scrollLeft ? (t.scrollLeft = 0) : t !== document.body && this._resetHorizontalScrollPosition(t.parentNode);
            },
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            itemsCreated(e) {
                let t = 360 * Math.random();
                this._items.forEach((e) => {
                    const i = "dark" == e.el.dataset.galleryItemTheme,
                        s = i ? "90%" : "20%",
                        n = i ? "15%" : "75%";
                    e.el.style.backgroundColor = `hsl(${(t = (t + 60) % 360)}, ${s}, ${n})`;
                });
            },
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(155),
            n = i(163),
            r = i(164),
            o = i(165),
            a = i(166),
            l = i(167);
        e.exports = class {
            constructor(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if ("number" != typeof e || !isFinite(e)) throw new TypeError(`Clip duration must be a finite number; got "${e}"`);
                "function" == typeof t && (t = { draw: t }),
                    (this.ease = o(t.ease)),
                    (this.update = o(t.update)),
                    (this.draw = t.draw),
                    (this.prepare = o(t.prepare)),
                    (this.finish = o(t.finish)),
                    (this._duration = 1e3 * e),
                    (this._startTime = null),
                    (this._isPrepared = !1),
                    (this._promise = null),
                    (this._isPlaying = !1);
            }
            get isReversed() {
                return this._duration < 0;
            }
            get isComplete() {
                const e = this.progress;
                return (!this.isReversed && e >= 1) || (this.isReversed && e <= 0);
            }
            get progress() {
                if (0 === this._duration) return 1;
                let e = (this.lastFrameTime - this._startTime) / this._duration;
                return this.isReversed && (e = 1 + e), l(e, 0, 1);
            }
            get easedProgress() {
                return this.ease ? this.ease(this.progress) : this.progress;
            }
            _run(e, t) {
                (this.lastFrameTime = Date.now()), null === this._startTime && (this._startTime = this.lastFrameTime);
                const i = this.easedProgress;
                this.update && s(() => this._isPlaying && this.update(i)),
                    n(() => {
                        this._isPlaying && (this.draw(i), this.isComplete ? a(n, [this.finish, t]) : this._run(this, t));
                    });
            }
            play() {
                if ("function" != typeof this.draw) throw new Error('Clip must be given a "draw" function as an option or have its "draw" method overriden.');
                return (
                    (this._isPlaying = !0),
                    this._promise ||
                        (this._promise = new Promise((e, t) => {
                            !this._isPrepared && this.prepare
                                ? ((this._isPrepared = !0),
                                  n(() =>
                                      r(this.prepare(), () => {
                                          this._run(this, e);
                                      })
                                  ))
                                : this._run(this, e);
                        })),
                    this._promise
                );
            }
            destroy() {
                (this._isPlaying = !1), (this.draw = this.finish = this.update = null);
            }
            static play() {
                return new this(...arguments).play();
            }
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(100);
        e.exports = s.requestAnimationFrame("update");
    },
    function (e, t, i) {
        "use strict";
        var s = i(157),
            n = function (e) {
                (this.rafEmitter = new s()),
                    this.rafEmitter.on(e, this._onRAFExecuted.bind(this)),
                    (this.requestAnimationFrame = this.requestAnimationFrame.bind(this)),
                    (this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this)),
                    (this._frameCallbacks = []),
                    (this._nextFrameCallbacks = []),
                    (this._currentFrameID = -1),
                    (this._cancelFrameIdx = -1),
                    (this._frameCallbackLength = 0),
                    (this._nextFrameCallbacksLength = 0),
                    (this._frameCallbackIteration = 0);
            },
            r = n.prototype;
        (r.requestAnimationFrame = function (e) {
            return (this._currentFrameID = this.rafEmitter.run()), this._nextFrameCallbacks.push(this._currentFrameID, e), (this._nextFrameCallbacksLength += 2), this._currentFrameID;
        }),
            (r.cancelAnimationFrame = function (e) {
                (this._cancelFrameIdx = this._nextFrameCallbacks.indexOf(e)),
                    -1 !== this._cancelFrameIdx &&
                        (this._nextFrameCallbacks.splice(this._cancelFrameIdx, 2), (this._nextFrameCallbacksLength -= 2), 0 === this._nextFrameCallbacksLength && this.rafEmitter.cancel());
            }),
            (r._onRAFExecuted = function (e) {
                for (
                    this._frameCallbacks = this._nextFrameCallbacks,
                        this._frameCallbackLength = this._nextFrameCallbacksLength,
                        this._nextFrameCallbacks = [],
                        this._nextFrameCallbacksLength = 0,
                        this._frameCallbackIteration = 0;
                    this._frameCallbackIteration < this._frameCallbackLength;
                    this._frameCallbackIteration += 2
                )
                    this._frameCallbacks[this._frameCallbackIteration + 1](e.time, e);
            }),
            (e.exports = n);
    },
    function (e, t, i) {
        "use strict";
        var s = i(158),
            n = function (e) {
                s.call(this, e);
            };
        ((n.prototype = Object.create(s.prototype))._subscribe = function () {
            return this.executor.subscribe(this, !0);
        }),
            (e.exports = n);
    },
    function (e, t, i) {
        "use strict";
        var s,
            n = i(3).EventEmitterMicro,
            r = i(159),
            o = i(162);
        function a(e) {
            (e = e || {}), n.call(this), (this.id = o.getNewID()), (this.executor = e.executor || r), this._reset(), (this._willRun = !1), (this._didDestroy = !1);
        }
        ((s = a.prototype = Object.create(n.prototype)).run = function () {
            return this._willRun || (this._willRun = !0), this._subscribe();
        }),
            (s.cancel = function () {
                this._unsubscribe(), this._willRun && (this._willRun = !1), this._reset();
            }),
            (s.destroy = function () {
                var e = this.willRun();
                return this.cancel(), (this.executor = null), n.prototype.destroy.call(this), (this._didDestroy = !0), e;
            }),
            (s.willRun = function () {
                return this._willRun;
            }),
            (s.isRunning = function () {
                return this._isRunning;
            }),
            (s._subscribe = function () {
                return this.executor.subscribe(this);
            }),
            (s._unsubscribe = function () {
                return this.executor.unsubscribe(this);
            }),
            (s._onAnimationFrameStart = function (e) {
                (this._isRunning = !0), (this._willRun = !1), this._didEmitFrameData || ((this._didEmitFrameData = !0), this.trigger("start", e));
            }),
            (s._onAnimationFrameEnd = function (e) {
                this._willRun || (this.trigger("stop", e), this._reset());
            }),
            (s._reset = function () {
                (this._didEmitFrameData = !1), (this._isRunning = !1);
            }),
            (e.exports = a);
    },
    function (e, t, i) {
        "use strict";
        var s = i(20).SharedInstance,
            n = i(160);
        e.exports = s.share("ac-raf-executor:sharedRAFExecutorInstance", "2.0.1", n);
    },
    function (e, t, i) {
        "use strict";
        var s;
        function n(e) {
            (e = e || {}),
                this._reset(),
                (this._willRun = !1),
                (this._totalSubscribeCount = -1),
                (this._requestAnimationFrame = window.requestAnimationFrame),
                (this._cancelAnimationFrame = window.cancelAnimationFrame),
                (this._boundOnAnimationFrame = this._onAnimationFrame.bind(this)),
                (this._boundOnExternalAnimationFrame = this._onExternalAnimationFrame.bind(this));
        }
        i(161),
            ((s = n.prototype).subscribe = function (e, t) {
                return (
                    this._totalSubscribeCount++,
                    this._nextFrameSubscribers[e.id] ||
                        (t ? this._nextFrameSubscribersOrder.unshift(e.id) : this._nextFrameSubscribersOrder.push(e.id),
                        (this._nextFrameSubscribers[e.id] = e),
                        this._nextFrameSubscriberArrayLength++,
                        this._nextFrameSubscriberCount++,
                        this._run()),
                    this._totalSubscribeCount
                );
            }),
            (s.unsubscribe = function (e) {
                return !!this._nextFrameSubscribers[e.id] && ((this._nextFrameSubscribers[e.id] = null), this._nextFrameSubscriberCount--, 0 === this._nextFrameSubscriberCount && this._cancel(), !0);
            }),
            (s.trigger = function (e, t) {
                var i;
                for (i = 0; i < this._subscriberArrayLength; i++)
                    null !== this._subscribers[this._subscribersOrder[i]] &&
                        !1 === this._subscribers[this._subscribersOrder[i]]._didDestroy &&
                        this._subscribers[this._subscribersOrder[i]].trigger(e, t);
            }),
            (s.destroy = function () {
                var e = this._cancel();
                return (
                    (this._subscribers = null),
                    (this._subscribersOrder = null),
                    (this._nextFrameSubscribers = null),
                    (this._nextFrameSubscribersOrder = null),
                    (this._rafData = null),
                    (this._boundOnAnimationFrame = null),
                    (this._onExternalAnimationFrame = null),
                    e
                );
            }),
            (s.useExternalAnimationFrame = function (e) {
                if ("boolean" == typeof e) {
                    var t = this._isUsingExternalAnimationFrame;
                    return (
                        e && this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), (this._animationFrame = null)),
                        !this._willRun || e || this._animationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)),
                        (this._isUsingExternalAnimationFrame = e),
                        e ? this._boundOnExternalAnimationFrame : t || !1
                    );
                }
            }),
            (s._run = function () {
                if (!this._willRun)
                    return (
                        (this._willRun = !0),
                        0 === this.lastFrameTime && (this.lastFrameTime = performance.now()),
                        (this._animationFrameActive = !0),
                        this._isUsingExternalAnimationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)),
                        !0
                    );
            }),
            (s._cancel = function () {
                var e = !1;
                return (
                    this._animationFrameActive &&
                        (this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), (this._animationFrame = null)),
                        (this._animationFrameActive = !1),
                        (this._willRun = !1),
                        (e = !0)),
                    this._isRunning || this._reset(),
                    e
                );
            }),
            (s._onSubscribersAnimationFrameStart = function (e) {
                var t;
                for (t = 0; t < this._subscriberArrayLength; t++)
                    null !== this._subscribers[this._subscribersOrder[t]] &&
                        !1 === this._subscribers[this._subscribersOrder[t]]._didDestroy &&
                        this._subscribers[this._subscribersOrder[t]]._onAnimationFrameStart(e);
            }),
            (s._onSubscribersAnimationFrameEnd = function (e) {
                var t;
                for (t = 0; t < this._subscriberArrayLength; t++)
                    null !== this._subscribers[this._subscribersOrder[t]] &&
                        !1 === this._subscribers[this._subscribersOrder[t]]._didDestroy &&
                        this._subscribers[this._subscribersOrder[t]]._onAnimationFrameEnd(e);
            }),
            (s._onAnimationFrame = function (e) {
                (this._subscribers = this._nextFrameSubscribers),
                    (this._subscribersOrder = this._nextFrameSubscribersOrder),
                    (this._subscriberArrayLength = this._nextFrameSubscriberArrayLength),
                    (this._subscriberCount = this._nextFrameSubscriberCount),
                    (this._nextFrameSubscribers = {}),
                    (this._nextFrameSubscribersOrder = []),
                    (this._nextFrameSubscriberArrayLength = 0),
                    (this._nextFrameSubscriberCount = 0),
                    (this._isRunning = !0),
                    (this._willRun = !1),
                    (this._didRequestNextRAF = !1),
                    (this._rafData.delta = e - this.lastFrameTime),
                    (this.lastFrameTime = e),
                    (this._rafData.fps = 0),
                    this._rafData.delta >= 1e3 && (this._rafData.delta = 0),
                    0 !== this._rafData.delta && (this._rafData.fps = 1e3 / this._rafData.delta),
                    (this._rafData.time = e),
                    (this._rafData.naturalFps = this._rafData.fps),
                    (this._rafData.timeNow = Date.now()),
                    this._onSubscribersAnimationFrameStart(this._rafData),
                    this.trigger("update", this._rafData),
                    this.trigger("external", this._rafData),
                    this.trigger("draw", this._rafData),
                    this._onSubscribersAnimationFrameEnd(this._rafData),
                    this._willRun || this._reset();
            }),
            (s._onExternalAnimationFrame = function (e) {
                this._isUsingExternalAnimationFrame && this._onAnimationFrame(e);
            }),
            (s._reset = function () {
                (this._rafData = { time: 0, delta: 0, fps: 0, naturalFps: 0, timeNow: 0 }),
                    (this._subscribers = {}),
                    (this._subscribersOrder = []),
                    (this._subscriberArrayLength = 0),
                    (this._subscriberCount = 0),
                    (this._nextFrameSubscribers = {}),
                    (this._nextFrameSubscribersOrder = []),
                    (this._nextFrameSubscriberArrayLength = 0),
                    (this._nextFrameSubscriberCount = 0),
                    (this._didEmitFrameData = !1),
                    (this._animationFrame = null),
                    (this._animationFrameActive = !1),
                    (this._isRunning = !1),
                    (this._shouldReset = !1),
                    (this.lastFrameTime = 0);
            }),
            (e.exports = n);
    },
    function (e, t) {},
    function (e, t, i) {
        "use strict";
        var s = i(20).SharedInstance,
            n = function () {
                this._currentID = 0;
            };
        (n.prototype.getNewID = function () {
            return this._currentID++, "raf:" + this._currentID;
        }),
            (e.exports = s.share("ac-raf-emitter-id-generator:sharedRAFEmitterIDGeneratorInstance", "1.0.3", n));
    },
    function (e, t, i) {
        "use strict";
        var s = i(100);
        e.exports = s.requestAnimationFrame("draw");
    },
    function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            e instanceof Promise ? e.then(t) : t();
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = function (e) {
            return "function" == typeof e ? e : null;
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = function (e, t) {
            const i = t.length;
            let s = 0;
            !(function n() {
                "function" == typeof t[s] && e(t[s]), s++, s < i && n();
            })();
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = function (e, t, i) {
            return Math.min(Math.max(e, t), i);
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(7);
        e.exports = {
            itemsCreated() {
                const e = Array.from(this.el.querySelectorAll(this.model.FadeCaptionOnChange.ItemSelector));
                if (!e || 0 == e.length) return !1;
                this._items.forEach((t, i) => {
                    (t.caption = e[i]),
                        t.caption.setAttribute(s.HIDDEN, "true"),
                        t.el.setAttribute(s.DESCRIBEDBY, t.caption.id),
                        t.on("select", () => {
                            t.caption.classList.add("current"), t.caption.removeAttribute(s.HIDDEN);
                        }),
                        t.on("deselect", () => {
                            this.selections.occurred.previous && (this.selections.occurred.previous.caption.classList.remove("current"), t.caption.setAttribute(s.HIDDEN, "true"));
                        });
                });
            },
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(47),
            n = i(7),
            r = i(22);
        e.exports = {
            created() {
                this.tabNav = { items: [], current: null };
            },
            itemsCreated() {
                Array.from(this.el.querySelectorAll(this.model.TabNav.ItemSelector)).forEach((e, t) => {
                    const i = new o(e, t),
                        s = this.getItemForTrigger(i.trigger);
                    (i.onSelected = (e) => {
                        (this.lastInteractionEvent = e), e.preventDefault();
                        let i = t - this.wrappedIndex(this.currentIndex),
                            s = this.currentIndex + i;
                        this.animateToItem(s);
                    }),
                        s.on("select", () => {
                            e.classList.add("current"), i.anchorEl.classList.add("current"), (i.anchorEl.checked = !0), (i.anchorEl.ariaSelected = !0);
                        }),
                        s.on("deselect", () => {
                            e.classList.remove("current"), i.anchorEl.classList.remove("current"), (i.anchorEl.checked = !1), (i.anchorEl.ariaSelected = !1);
                        }),
                        i.anchorEl.addEventListener("click", i.onSelected),
                        this.tabNav.items.push(i);
                }),
                    this._items.forEach((e, t) => {
                        e.el.setAttribute("role", r.TABPANEL), e.el.setAttribute(n.LABELLEDBY, this.tabNav.items[t].anchorEl.id), this.tabNav.items[t].anchorEl.setAttribute(n.CONTROLS, e.el.id);
                    });
            },
            mounted() {
                const e = this.tabNav.items[0].el.parentElement;
                this.roamingTabIndex = new s(e, { selector: this.model.TabNav.RoamingTabIndexSelector });
            },
            onItemChangeCompleted(e) {
                let t = this.tabNav.items.filter((t) => t.trigger === e.current.id)[0];
                this.setCurrentItem(t), document.activeElement.parentElement.parentElement === t.el.parentElement && t.anchorEl.focus();
            },
            setCurrentItem(e) {
                e !== this.tabNav.current && (this.tabNav.current = e);
            },
        };
        class o {
            constructor(e, t) {
                (this.el = e),
                    (this.index = t),
                    (this.anchorEl = e.querySelector("input")),
                    (this.trigger = this.anchorEl.getAttribute("data-ac-gallery-trigger")),
                    this.anchorEl.setAttribute("role", r.TAB);
            }
        }
    },
    function (e, t) {
        e.exports = require("@marcom/ac-analytics");
    },
    function (e, t, i) {
        "use strict";
        const s = i(6);
        e.exports = class extends s {
            constructor(e) {
                super(e),
                    (this.video = this.el.querySelector("video")),
                    (this.videoKeyframeData = JSON.parse(this.video.getAttribute("data-video-progress-kf"))),
                    (this.scrollDuration = getComputedStyle(this.el).getPropertyValue("--scroll-duration")),
                    (this.scrollGroup = this.anim.createScrollGroup(this.el)),
                    (this.timeGroup = this.anim.createTimeGroup()),
                    (this.headline = this.el.querySelector(this.el.dataset.headline)),
                    (this.headlineGradientData = JSON.parse(this.el.querySelector(this.el.dataset.headlineGradient).dataset.animKeyframe)),
                    (this.eyebrow = this.el.querySelector(this.el.dataset.eyebrow)),
                    (this.bubbleWrapper = document.querySelector(this.el.dataset.bubbleWrapper)),
                    (this.bubbleElems = document.querySelectorAll(this.el.dataset.bubbleSelector)),
                    (this.unifiedAnchors = JSON.parse(this.el.dataset.anchors).map((e) => (this.el === document.querySelector(e) ? this.el : this.el.querySelector(e)))),
                    (this.alternateLayoutClass = getComputedStyle(this.el).getPropertyValue("--feature-alternate").trim()),
                    (this.alternateLayout = document.documentElement.classList.contains(this.alternateLayoutClass)),
                    (this.timeGroup.name = this.el.dataset.componentList);
            }
            mounted() {
                this.bubbleWrapper.classList.remove("heart-loading"), this.addVariableFrames(), this.addAnimationFrames(), this.rebaseInlineStyle();
            }
            rebaseInlineStyle() {
                const e = this.gum.getComponentOfType("ReBase", document.body),
                    t = "--hero-offset";
                e.on(e.EVT_REBASE, () => {
                    getComputedStyle(this.el).getPropertyValue(t) && this.el.style.removeProperty(t);
                });
            }
            createKeyFrameData(e) {
                if (!e) return !1;
                let t = JSON.parse(e),
                    i = { start: t.start, end: t.end, scale: t.scale || [0, 1] };
                return t.easeFunction && (i.easeFunction = t.easeFunction), i;
            }
            forceUpdate() {
                requestAnimationFrame(() => {
                    this.anim.forceUpdate();
                });
            }
            addVariableFrames() {
                this.anim.addKeyframe(this.el, { start: "a2t - 100vh", end: "a2t - 50vh", "--hero-offset": ["(100vh - a1h) * 0.5", "(100vh - a1h) * 0.5", "px"], anchors: this.unifiedAnchors }),
                    this.forceUpdate();
            }
            addAnimationFrames() {
                const e = `${this.videoKeyframeData.end} - 25vh`,
                    t = `${this.headlineGradientData.start} + 10vh`;
                this.alternateLayout ||
                    (this.scrollGroup.addKeyframe(this.eyebrow, { start: e, end: e, opacity: [0, 1], anchors: this.unifiedAnchors }),
                    this.scrollGroup.addKeyframe(this.headline, { start: e, end: `${e} + 5vh`, opacity: [0, 1], anchors: this.unifiedAnchors })),
                    this.bubbleElems.forEach((e, t) => {
                        let i = this.createKeyFrameData(e.dataset.customPrimaryKf),
                            s = this.createKeyFrameData(e.dataset.customSecondaryKf);
                        i && this.timeGroup.addKeyframe(e, i), s && this.timeGroup.addKeyframe(e, s);
                    }),
                    this.scrollGroup.addKeyframe(this.timeGroup, { start: t, end: `${t} + 15vh`, progressValue: [0, 1], anchors: this.unifiedAnchors }),
                    this.scrollGroup.addKeyframe(this.el, { start: "a0t - 100vh", end: "a0b + 100vh", opacity: [1, 1], anchors: this.unifiedAnchors });
            }
            onResizeDebounced() {
                this.forceUpdate();
            }
            static IS_SUPPORTED() {
                return document.documentElement.classList.contains("enhance-xp");
            }
        };
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.Finishes = void 0);
        const s = i(6);
        class n extends s {
            constructor(e) {
                super(e),
                    (this.scrollGroup = this.gum.anim.getGroupForTarget(this.el)),
                    (this.animKeyframes = [this.scrollGroup]),
                    (this.scrollContainer = this.el),
                    (this.stickyContentCopy = this.el.querySelector(".sticky-content-copy .section-content")),
                    (this.stickyContentFigures = this.el.querySelector(".sticky-content-figures")),
                    (this.figureMidnight = this.el.querySelector(".design-finishes-figure-midnight")),
                    (this.figureSilver = this.el.querySelector(".design-finishes-figure-silver")),
                    (this.figureSpacegray = this.el.querySelector(".design-finishes-figure-spacegray")),
                    (this.figureStarlight = this.el.querySelector(".design-finishes-figure-starlight")),
                    (this.captionMidnight = this.el.querySelector(".design-finishes-figcaption-midnight")),
                    (this.captionSilver = this.el.querySelector(".design-finishes-figcaption-silver")),
                    (this.captionSpacegray = this.el.querySelector(".design-finishes-figcaption-spacegray")),
                    (this.captionStarlight = this.el.querySelector(".design-finishes-figcaption-starlight")),
                    (this.loadEarly = "a0t - 100vh"),
                    (this.start = "a0t - 20vh"),
                    (this.midnightEnd = "a0t + 70vh"),
                    (this.spacegrayEnd = "a0t + 170vh"),
                    (this.silverEnd = "a0t + 270vh"),
                    (this.starlightEnd = "a0t + 370vh"),
                    (this.end = "a0t + 380vh"),
                    (this.captionTranslate = ["10px", 0]),
                    (this.captionEase = "0.5"),
                    (this.opacityHide = [1, 0]),
                    (this.opacityShow = [0, 1]);
            }
            mounted() {
                this.toggleVisibility(), this.toggleWillChange(), this.animateCaption(), this.adjustStickyFiguresMargins();
            }
            toggleWillChange() {
                this.anim.addKeyframe(this.figureMidnight, { start: this.loadEarly, end: this.end, cssClass: "js-will-change", toggle: !0, anchors: this.scrollContainer }),
                    this.anim.addKeyframe(this.figureSpacegray, { start: this.loadEarly, end: this.end, cssClass: "js-will-change", toggle: !0, anchors: this.scrollContainer }),
                    this.anim.addKeyframe(this.figureSilver, { start: this.loadEarly, end: this.end, cssClass: "js-will-change", toggle: !0, anchors: this.scrollContainer }),
                    this.anim.addKeyframe(this.figureStarlight, { start: this.loadEarly, end: this.end, cssClass: "js-will-change", toggle: !0, anchors: this.scrollContainer });
            }
            toggleVisibility() {
                this.anim.addKeyframe(this.figureMidnight, { start: this.loadEarly, end: this.midnightEnd, cssClass: "show", toggle: !0, anchors: this.scrollContainer }),
                    this.anim.addKeyframe(this.figureSpacegray, { start: this.midnightEnd, end: this.spacegrayEnd, cssClass: "show", toggle: !0, anchors: this.scrollContainer }),
                    this.anim.addKeyframe(this.figureSilver, { start: this.spacegrayEnd, end: this.silverEnd, cssClass: "show", toggle: !0, anchors: this.scrollContainer }),
                    this.anim.addKeyframe(this.figureStarlight, { start: this.silverEnd, cssClass: "show", toggle: !0, anchors: this.scrollContainer });
            }
            animateCaption() {
                this.anim.addKeyframe(this.captionMidnight, { start: this.start, opacity: this.opacityShow, anchors: this.scrollContainer }),
                    this.anim.addKeyframe(this.captionMidnight, { start: this.start, end: this.midnightEnd, y: this.captionTranslate, ease: this.captionEase, anchors: this.scrollContainer }),
                    this.anim.addKeyframe(this.captionSpacegray, { start: this.midnightEnd, opacity: this.opacityShow, anchors: this.scrollContainer }),
                    this.anim.addKeyframe(this.captionSpacegray, { start: this.midnightEnd, end: this.spacegrayEnd, y: this.captionTranslate, ease: this.captionEase, anchors: this.scrollContainer }),
                    this.anim.addKeyframe(this.captionSilver, { start: this.spacegrayEnd, opacity: this.opacityShow, anchors: this.scrollContainer }),
                    this.anim.addKeyframe(this.captionSilver, { start: this.spacegrayEnd, end: this.silverEnd, y: this.captionTranslate, ease: this.captionEase, anchors: this.scrollContainer }),
                    this.anim.addKeyframe(this.captionStarlight, { start: this.silverEnd, opacity: this.opacityShow, anchors: this.scrollContainer }),
                    this.anim.addKeyframe(this.captionStarlight, { start: this.silverEnd, end: this.starlightEnd, y: this.captionTranslate, ease: this.captionEase, anchors: this.scrollContainer }),
                    this.anim.addKeyframe(this.captionStarlight, { start: this.starlightEnd, end: this.end, opacity: this.opacityHide, anchors: this.scrollContainer });
            }
            forceUpdate() {
                requestAnimationFrame(() => {
                    this.anim.forceUpdate();
                });
            }
            adjustStickyFiguresMargins() {
                this.anim.addKeyframe(this.stickyContentFigures, {
                    start: "a1t - 100vh",
                    end: "a1t - 50vh",
                    "--figures-margin-top-bottom": ["(a1h - a0h) * 0.5", "(a1h - a0h) * 0.5", "px"],
                    anchors: [this.stickyContentCopy, this.stickyContentFigures],
                    breakpointMask: "S",
                }),
                    this.forceUpdate();
            }
            static IS_SUPPORTED() {
                return document.documentElement.classList.contains("enhance-xp");
            }
        }
        (t.Finishes = n), (e.exports = n);
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.Hero = void 0);
        var n = s(i(6));
        class r extends n.default {
            constructor(e) {
                super(...arguments), (this.animationKeyframes = []);
            }
            mounted() {
                const e = this.gum.getComponentOfType("ReBase", document.body);
                e.on(e.EVT_REBASE, () => {
                    (this.el.querySelector(".product-container").style = null),
                        requestAnimationFrame(() => {
                            this.anim.forceUpdate();
                        });
                }),
                    this.initTextAnimation();
            }
            initTextAnimation() {
                [...this.el.querySelectorAll(".text-fade-in")].forEach((e) => {
                    this.animationKeyframes.push(this.anim.addKeyframe(e, { start: "b - 100vh", end: "b - 90vh", opacity: [0, 1] }));
                });
                [...this.el.querySelectorAll(".text-fade-in-w-parallax")].forEach((e) => {
                    this.animationKeyframes.push(this.anim.addKeyframe(e, { start: "b - 100vh", end: "b - 90vh", opacity: [0, 1], y: [20, 0, "px"] }));
                });
            }
            onBreakpointChange(e) {}
            onResizeDebounced() {}
            static IS_SUPPORTED() {
                return document.documentElement.classList.contains("enhance-xp");
            }
        }
        (t.Hero = r), (e.exports = r);
    },
    function (e, t, i) {
        "use strict";
        var s = i(0),
            n = i(175),
            r = s(i(6)),
            o = i(193),
            a = i(194);
        class l extends r.default {
            constructor(e) {
                super(e);
            }
            async mounted() {
                n.Media.addPlugin("AnimPlayOnce", o.AnimPlayOnce),
                    n.Media.addPlugin("ShowOnEnd", a.ShowOnEnd),
                    (this.mediaInstance = await n.Media.autoInitialize(this.el, { anim: this.gum.anim })),
                    (this.mediaTimeout = this.mediaTimeout.bind(this)),
                    this.mediaInstance[0].on("inline-media-timeout", this.mediaTimeout);
            }
            mediaTimeout() {
                this.el.classList.add("media-timeout");
            }
            destroy() {
                this.mediaInstance[0].off("inline-media-timeout", this.mediaTimeout), this.mediaInstance.forEach((e) => e.destroy());
            }
            static IS_SUPPORTED() {
                return document.documentElement.classList.contains("enhance-xp");
            }
        }
        e.exports = l;
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }),
            Object.defineProperty(t, "Media", {
                enumerable: !0,
                get: function () {
                    return n.default;
                },
            }),
            Object.defineProperty(t, "Plugin", {
                enumerable: !0,
                get: function () {
                    return r.default;
                },
            }),
            (t.autoInit = void 0),
            Object.defineProperty(t, "default", {
                enumerable: !0,
                get: function () {
                    return n.default;
                },
            });
        var n = s(i(104)),
            r = s(i(8));
        const o = n.default.autoInitialize;
        t.autoInit = o;
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(177)),
            r = s(i(178)),
            o = s(i(179)),
            a = s(i(180)),
            l = [n.default, r.default, o.default, a.default];
        t.default = l;
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(8));
        class r extends n.default {
            get src() {
                if (!this.media.el.currentSrc && !this.media.el.src) for (let e of this.media.el.querySelectorAll("source")) if (this.media.el.canPlayType(e.type)) return e.src;
                return this.media.el.currentSrc || this.media.el.src;
            }
        }
        var o = r;
        t.default = o;
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(8)),
            r = s(i(105)),
            o = s(i(16)),
            a = s(i(49)),
            l = s(i(50)),
            h = s(i(56));
        const c = r.default.CAN_PLAY_THROUGH,
            { HAVE_NOTHING: u, HAVE_CURRENT_DATA: d, NETWORK_EMPTY: m } = HTMLMediaElement;
        class p extends n.default {
            constructor(e) {
                super(e), (this._loadCompleteEvent = e.loadCompleteEvent || c), (this._onLoaded = this._onLoaded.bind(this)), (this._onError = this._onError.bind(this));
            }
            mounted() {
                "none" !== this.media.el.preload &&
                    this.media.src &&
                    (async () => {
                        try {
                            await this.media.load(this.media.src);
                        } catch (e) {
                            (0, l.default)(`auto load of ${this.media.src} failed or was aborted with err:${e}`);
                        }
                    })();
            }
            async load(e) {
                if ((void 0 === e && this.media.src && (e = this.media.src), !e)) throw new Error("No Media src was specified, can not fullfill load() request");
                return (
                    e !== this._currentLoadUrl &&
                        (this.media.trigger(o.default.MEDIA_LOAD_START),
                        (this._currentLoadUrl = e),
                        (this._pendingPromise = new Promise((t, i) => {
                            (this._resolvePendingPromise = () => {
                                (this._resolvePendingPromise = null), (this._rejectPendingPromise = null), t();
                            }),
                                (this._rejectPendingPromise = () => {
                                    (this._resolvePendingPromise = null), (this._rejectPendingPromise = null), i();
                                }),
                                this.media.el.addEventListener(this._loadCompleteEvent, this._onLoaded),
                                h.default.browser.firefox && this._loadCompleteEvent === r.default.CAN_PLAY_THROUGH && this.media.el.addEventListener(r.default.CAN_PLAY, this._onLoaded),
                                this.media.el.addEventListener(r.default.ERROR, this._onError),
                                this.media.el.addEventListener(r.default.ABORT, this._onError),
                                (this.media.el.src = e),
                                this.media.el.load();
                        }))),
                    this._pendingPromise
                );
            }
            _clearLoadListeners() {
                this.media.el.removeEventListener(this._loadCompleteEvent, this._onLoaded),
                    this.media.el.removeEventListener(r.default.CAN_PLAY, this._onLoaded),
                    this.media.el.removeEventListener(r.default.ERROR, this._onError),
                    this.media.el.removeEventListener(r.default.ABORT, this._onError);
            }
            _onLoaded() {
                this._clearLoadListeners(), this.media.trigger(o.default.LOADING_STATE_CHANGE), this.media.trigger(o.default.MEDIA_LOAD_COMPLETE), this._resolvePendingPromise();
            }
            _onError() {
                this._clearLoadListeners(), this.media.trigger(o.default.MEDIA_LOAD_ERROR), this.media.trigger(o.default.LOADING_STATE_CHANGE), this._rejectPendingPromise();
            }
            abortLoad() {
                this._rejectPendingPromise && this._rejectPendingPromise();
            }
            get loadingState() {
                return this.media.el.error
                    ? a.default.ERROR
                    : this.media.el.networkState === m && this.media.el.readyState === u
                    ? a.default.EMPTY
                    : this.media.el.readyState < d
                    ? this.media.el.buffered.length && 0 === this.media.el.buffered.start(0) && this.media.el.buffered.end(0) === this.media.el.duration
                        ? a.default.LOADED
                        : a.default.LOADING
                    : a.default.LOADED;
            }
            destroy() {
                this._clearLoadListeners(), super.destroy();
            }
        }
        var f = p;
        t.default = f;
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(8)),
            r = s(i(51));
        const { HAVE_METADATA: o, HAVE_CURRENT_DATA: a } = HTMLVideoElement;
        class l extends n.default {
            constructor(e) {
                super(e), this._initialize();
            }
            _initialize() {
                (this.media.el.playsInline = !0), this.media.el.autoplay && (this._autoPlayTimer = setTimeout(() => this.media.play()));
            }
            async play() {
                (this._playRequestPending = !0), this.media.el.readyState < o && (await this.media.load()), await this.media.el.play(), (this._playRequestPending = !1);
            }
            get playbackState() {
                if (!this._playRequestPending) {
                    if (this.media.el.ended) return r.default.ENDED;
                    if (this.media.el.paused && !this.media.el.ended) return r.default.PAUSED;
                }
                return r.default.PLAYING;
            }
            destroy() {
                clearTimeout(this._autoPlayTimer), super.destroy();
            }
        }
        var h = l;
        t.default = h;
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(8)),
            r = s(i(51)),
            o = s(i(49)),
            a = s(i(105)),
            l = s(i(16));
        const h = [
                a.default.LOADED_DATA,
                a.default.LOAD_START,
                a.default.CAN_PLAY,
                a.default.CAN_PLAY_THROUGH,
                a.default.PLAY,
                a.default.PLAYING,
                a.default.PAUSE,
                a.default.WAITING,
                a.default.SEEKING,
                a.default.SEEKED,
                a.default.ERROR,
                a.default.ENDED,
            ],
            c = "[data-inline-media-controller={id}]";
        class u extends n.default {
            constructor(e) {
                super(e),
                    (this._container = e.container || this.media.el.parentElement),
                    (this._playbackState = r.default.IDLE),
                    (this._loadingState = o.default.EMPTY),
                    (this._elementsToDecorate = []),
                    this._container && this._elementsToDecorate.push(this._container),
                    this.media.id && this._elementsToDecorate.push(...Array.from(document.querySelectorAll(c.replace("{id}", this.media.id))));
                for (const e of this._elementsToDecorate) e.classList.add(this._playbackState), e.classList.add(this._loadingState);
                (this.updateState = this.updateState.bind(this)), this._addEventListeners();
            }
            _addEventListeners() {
                for (let e of h) this.media.el.addEventListener(e, this.updateState);
                this.media.on(l.default.LOADING_STATE_CHANGE, this.updateState), this.media.on(l.default.PLAYBACK_STATE_CHANGE, this.updateState);
            }
            _removeEventListeners() {
                for (let e of h) this.media.el.removeEventListener(e, this.updateState);
                this.media.off(l.default.LOADING_STATE_CHANGE, this.updateState), this.media.off(l.default.PLAYBACK_STATE_CHANGE, this.updateState);
            }
            updateState(e) {
                const t = this.media.playbackState,
                    i = this._playbackState,
                    s = this.media.loadingState,
                    n = this._loadingState;
                if (((this._playbackState = t), (this._loadingState = s), t !== i)) {
                    for (const e of this._elementsToDecorate) e.classList.add(t), e.classList.remove(i);
                    this.media.trigger(l.default.PLAYBACK_STATE_CHANGE);
                }
                if (s !== n) {
                    for (const e of this._elementsToDecorate) e.classList.add(s), e.classList.remove(n);
                    this.media.trigger(l.default.LOADING_STATE_CHANGE);
                }
            }
            destroy() {
                for (const e of this._elementsToDecorate) e.classList.remove(this._playbackState), e.classList.remove(this._loadingState);
                this._removeEventListeners(), super.destroy();
            }
        }
        var d = u;
        t.default = d;
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = async function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document,
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                e || (e = document);
                const i = e.querySelectorAll("[data-inline-media]"),
                    s = [];
                for (let e of i) {
                    const i = e.dataset,
                        o = i.inlineMediaPlugins ? i.inlineMediaPlugins.split(",").map((e) => e.trim()) : [],
                        a = [];
                    for (const e of o)
                        if (!n.pluginCache[e]) {
                            if (!r.default[e]) throw new Error(`Error Trying to use undefined Plugin named: ${e} . Ensure you call Media.addPlugin() first to register this custom plugin!`);
                            a.push(async () => {
                                const t = (await r.default[e]()).default;
                                n.default.addPlugin(e, t);
                            });
                        }
                    await Promise.all(a.map(async (e) => e())), s.push(new n.default(Object.assign({ el: e, plugins: o.map((e) => n.pluginCache[e]) }, t)));
                }
                return s;
            });
        var n = (function (e, t) {
                if (!t && e && e.__esModule) return e;
                if (null === e || ("object" != typeof e && "function" != typeof e)) return { default: e };
                var i = o(t);
                if (i && i.has(e)) return i.get(e);
                var s = {},
                    n = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var r in e)
                    if ("default" !== r && Object.prototype.hasOwnProperty.call(e, r)) {
                        var a = n ? Object.getOwnPropertyDescriptor(e, r) : null;
                        a && (a.get || a.set) ? Object.defineProperty(s, r, a) : (s[r] = e[r]);
                    }
                (s.default = e), i && i.set(e, s);
                return s;
            })(i(104)),
            r = s(i(182));
        function o(e) {
            if ("function" != typeof WeakMap) return null;
            var t = new WeakMap(),
                i = new WeakMap();
            return (o = function (e) {
                return e ? i : t;
            })(e);
        }
    },
    function (e, t, i) {
        "use strict";
        function s(e) {
            if ("function" != typeof WeakMap) return null;
            var t = new WeakMap(),
                i = new WeakMap();
            return (s = function (e) {
                return e ? i : t;
            })(e);
        }
        function n(e, t) {
            if (!t && e && e.__esModule) return e;
            if (null === e || ("object" != typeof e && "function" != typeof e)) return { default: e };
            var i = s(t);
            if (i && i.has(e)) return i.get(e);
            var n = {},
                r = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
                if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
                    var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                    a && (a.get || a.set) ? Object.defineProperty(n, o, a) : (n[o] = e[o]);
                }
            return (n.default = e), i && i.set(e, n), n;
        }
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var r = {
            AnimLoad: async () => Promise.resolve().then(() => n(i(183))),
            AnimPlay: async () => Promise.resolve().then(() => n(i(107))),
            FeatureObserver: async () => Promise.resolve().then(() => n(i(184))),
            LoadTimeout: async () => Promise.resolve().then(() => n(i(187))),
            PlayPauseButton: async () => Promise.resolve().then(() => n(i(188))),
            ViewportSource: async () => Promise.resolve().then(() => n(i(189))),
        };
        t.default = r;
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(106)),
            r = s(i(8)),
            o = s(i(50));
        const a = { start: "t - 200vh", end: "b + 100vh" };
        class l extends r.default {
            constructor(e) {
                super(e),
                    (this._anim = e.anim),
                    (this._container = e.container || this.media.el.parentElement),
                    (this._scrollGroup = this.options.scrollGroup || this._anim.getGroupForTarget(this._container || this.media.el)),
                    this._initialize();
            }
            _initialize() {
                (this._onLoadKeyframeEnter = this._onLoadKeyframeEnter.bind(this)), (this._onLoadKeyframeExit = this._onLoadKeyframeExit.bind(this));
                const e = (0, n.default)(this.media.el.dataset, this.options, "loadKeyframe", a);
                e.event || (e.event = "inline-media-load-kf"),
                    (this._loadKeyframe = this._scrollGroup.addKeyframe(this.media.el, e)),
                    this._loadKeyframe.controller.on(`${this._loadKeyframe.event}:enter`, this._onLoadKeyframeEnter),
                    this._loadKeyframe.controller.on(`${this._loadKeyframe.event}:exit`, this._onLoadKeyframeExit);
            }
            get loadKeyframe() {
                return this._loadKeyframe;
            }
            async _onLoadKeyframeEnter(e) {
                try {
                    await this.media.load(), (this._loaded = !0);
                } catch (e) {
                    (0, o.default)("AnimLoad: Load error occured");
                }
            }
            _onLoadKeyframeExit(e) {}
            destroy() {
                this._loadKeyframe.controller.off(`${this._loadKeyframe.event}:enter`, this._onLoadKeyframeEnter),
                    this._loadKeyframe.controller.off(`${this._loadKeyframe.event}:exit`, this._onLoadKeyframeExit),
                    super.destroy();
            }
        }
        t.default = l;
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(8)),
            r = s(i(51)),
            o = s(i(49)),
            a = s(i(16)),
            l = s(i(185)),
            h = s(i(186));
        const c = (e) => e,
            u = (e) => (e ? e.split(",").map((e) => e.trim()) : null);
        class d extends n.default {
            constructor(e) {
                super(e);
                const t = (t, i, s) => {
                    let n = "inlineMedia" + t[0].toUpperCase() + t.slice(1);
                    return i(this.media.el.dataset[n]) || e[t] || s;
                };
                (this._disabledStates = new l.default({ features: t("disabledWhen", u, []), onActivate: this.disable.bind(this), onDeactivate: this.enable.bind(this) })),
                    (this._destroyStates = new l.default({ features: t("destroyWhen", u, []), onActivate: this.destroyMedia.bind(this) })),
                    (this._pausedStates = new l.default({ features: t("pausedWhen", u, []), onActivate: this.pauseMedia.bind(this) })),
                    (this._autoplayStates = new l.default({ features: t("autoplayWhen", u, []), onActivate: this.autoplayMedia.bind(this), onDeactivate: this.disableAutoplay.bind(this) }));
                const i = e.featureDetect || {};
                var s;
                (this.featureCallbacks = Object.entries(i).map((e) => {
                    let [t, i] = e;
                    return new h.default({ featureClass: t, callback: i });
                })),
                    (this._featureElement = (s = t("featureElement", c, document.documentElement)) instanceof HTMLElement ? s : document.querySelector(s)),
                    (this.featureSets = [this._autoplayStates, this._pausedStates, this._disabledStates, this._destroyStates]),
                    (this._featuresUpdated = this._featuresUpdated.bind(this)),
                    (this.play = !1),
                    (this._observer = new MutationObserver(this._featuresUpdated)),
                    this._observer.observe(this._featureElement, { attributes: !0, attributeFilter: ["class"] }),
                    this._featuresUpdated();
            }
            get loadingState() {
                return this._disabledStates.isDetected ? o.default.DISABLED : void 0;
            }
            get playbackState() {
                return this._disabledStates.isDetected ? r.default.PAUSED : void 0;
            }
            _featuresUpdated() {
                let e = this._featureElement.classList;
                this.featureSets.filter((t) => (t.updateFeatureState(e), t.detectionChanged)).forEach((e) => e.applyEffect()),
                    this.featureCallbacks.forEach((t) => {
                        t.updatePresence(e), t.isPresent && t.presenceChanged && t.triggerCallback(this.media);
                    });
            }
            autoplayMedia() {
                this.media.el.setAttribute("autoplay", !0), this.media.play();
            }
            disableAutoplay() {
                this.media.el.setAttribute("autoplay", !1);
            }
            pauseMedia() {
                this.media.el.pause();
            }
            destroyMedia() {
                this.media.destroy();
            }
            destroy() {
                this._observer.disconnect();
            }
            disable() {
                this.media.abortLoad(), this.media.el.pause(), (this.play = c), this.media.trigger(a.default.LOADING_STATE_CHANGE), this.media.trigger(a.default.PLAYBACK_STATE_CHANGE);
            }
            enable() {
                (this.play = !1), this.media.trigger(a.default.LOADING_STATE_CHANGE), this.media.trigger(a.default.PLAYBACK_STATE_CHANGE);
            }
        }
        var m = d;
        t.default = m;
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        const s = () => {};
        var n = class {
            constructor(e) {
                var t;
                (this._features = new Set(((t = e.features), Array.isArray(t) ? t : t ? [t] : []))),
                    (this._isDetected = !1),
                    (this._wasDetected = !1),
                    (this._onActivate = e.onActivate || s),
                    (this._onDeactivate = e.onDeactivate || s);
            }
            get detectionChanged() {
                return this._isDetected !== this._wasDetected;
            }
            get isDetected() {
                return this._isDetected;
            }
            updateFeatureState(e) {
                this._wasDetected = this._isDetected;
                for (let t of e) if (this._features.has(t)) return void (this._isDetected = !0);
                this._isDetected = !1;
            }
            applyEffect() {
                this._isDetected ? this._onActivate() : this._onDeactivate();
            }
        };
        t.default = n;
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var s = class {
            constructor(e) {
                (this.featureClass = e.featureClass), (this._callback = e.callback), (this._isPresent = !1), (this._wasPresent = !1);
            }
            get presenceChanged() {
                return this._isPresent !== this._wasPresent;
            }
            get isPresent() {
                return this._isPresent;
            }
            updatePresence(e) {
                (this._wasPresent = this._isPresent), (this._isPresent = e.contains(this.featureClass));
            }
            triggerCallback(e) {
                return this._callback(e);
            }
        };
        t.default = s;
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(8)),
            r = s(i(16));
        const o = "inline-media-timeout";
        class a extends n.default {
            static get LOAD_TIMEOUT_EVENT() {
                return o;
            }
            constructor(e) {
                super(e);
                const t = this.media.el.dataset;
                (this._timeoutDelay = t.loadTimeout || e.loadTimeout || 3e4),
                    (this._onLoadStart = this._onLoadStart.bind(this)),
                    (this._onLoadComplete = this._onLoadComplete.bind(this)),
                    (this._onTimerComplete = this._onTimerComplete.bind(this)),
                    this.media.on(r.default.MEDIA_LOAD_START, this._onLoadStart),
                    this.media.on(r.default.MEDIA_LOAD_COMPLETE, this._onLoadComplete);
            }
            _onLoadStart() {
                clearTimeout(this._timer), (this._timer = setTimeout(this._onTimerComplete, this._timeoutDelay));
            }
            _onLoadComplete() {
                clearTimeout(this._timer);
            }
            _onTimerComplete() {
                this.media.trigger(o), this.media.destroy(), this.media.el.parentElement && this.media.el.parentElement.removeChild(this.media.el);
            }
            destroy() {
                clearTimeout(this._timer), this.media.off(r.default.MEDIA_LOAD_START, this._onLoadStart);
            }
        }
        t.default = a;
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(8)),
            r = s(i(16)),
            o = s(i(51));
        const a = '[data-inline-media-control="PlayPause"]',
            l = "[data-inline-media-controller='{id}']",
            h = "Pause",
            c = "Play",
            u = "Replay",
            d = { CLICK: "data-analytics-click", TITLE: "data-analytics-title" };
        class m extends n.default {
            constructor(e) {
                super(e),
                    (this._container = e.container || this.media.el.parentElement),
                    (this._button = this._findButton()),
                    (this._onClick = this._onClick.bind(this)),
                    (this._onPlaybackStateChange = this._onPlaybackStateChange.bind(this));
                const t = this._button.dataset;
                (this._ariaLabels = { playing: t.ariaPlaying || e.ariaPlaying || h, paused: t.ariaPaused || e.ariaPaused || c, ended: t.ariaEnded || e.ariaEnded || u }),
                    this._button.addEventListener("click", this._onClick),
                    this.media.on(r.default.PLAYBACK_STATE_CHANGE, this._onPlaybackStateChange),
                    (this._activeAnalytics = Object.values(d).filter(
                        (e) => (this._button.hasAttribute(e + "-play") && this._button.hasAttribute(e + "-pause")) || this._button.hasAttribute(e + "-replay")
                    ));
            }
            _findButton() {
                if (this.options.playPauseButton) return this.options.playPauseButton;
                let e = this._container.querySelector(`${a}`);
                if (!e) {
                    const t = document.querySelectorAll(l.replace("{id}", this.media.id));
                    for (const i of t) e = "PlayPause" === i.getAttribute("data-inline-media-control") ? i : i.querySelector(`${a}`);
                }
                return e;
            }
            _onPlaybackStateChange() {
                switch (this.media.playbackState) {
                    case o.default.PLAYING:
                        this._button.setAttribute("aria-label", this._ariaLabels.playing);
                        break;
                    case o.default.ENDED:
                        this._button.setAttribute("aria-label", this._ariaLabels.ended);
                        break;
                    default:
                        this._button.setAttribute("aria-label", this._ariaLabels.paused);
                }
                this._setAnalyticsState();
            }
            _setAnalyticsState() {
                let e;
                switch (this.media.playbackState) {
                    case o.default.PLAYING:
                        e = "pause";
                        break;
                    case o.default.ENDED:
                        e = "replay";
                        break;
                    default:
                        e = "play";
                }
                for (const t of this._activeAnalytics) {
                    let i = e;
                    "replay" !== e || this._button.hasAttribute(`${t}-${i}`) || (i = "play"), this._button.setAttribute(t, this._button.getAttribute(`${t}-${i}`));
                }
            }
            _onClick(e) {
                e.preventDefault(), this.media.el.paused ? this.media.play() : this.media.el.pause();
            }
            destroy() {
                this._button.removeEventListener("click", this._onClick), this.media.off(r.default.PLAYBACK_STATE_CHANGE, this._onPlaybackStateChange);
            }
        }
        t.default = m;
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(8)),
            r = s(i(108)),
            o = s(i(191)),
            a = s(i(49));
        class l extends n.default {
            constructor(e) {
                super(e), (this._cachedPlaying = null), this._initialize();
            }
            _initialize() {
                this._onBreakpointChange = this._onBreakpointChange.bind(this);
                const e = Object.assign({ callback: this._onBreakpointChange }, this.options);
                (this._breakpointDetect = e.anim ? new o.default(e) : new r.default(e)), (this._currentTime = 0);
                const t = this.media.el.dataset;
                (this._basePath = this.options.basePath || t.inlineMediaBasepath || "./"), this._onBreakpointChange();
            }
            _onBreakpointChange() {
                this._currentBreakpoint = this._breakpointDetect.breakpoint;
                const e = window.devicePixelRatio > 1 ? `${this._currentBreakpoint}_2x` : this._currentBreakpoint,
                    t = `${this._basePath}${e}.mp4`;
                this._swapSrc(t);
            }
            get src() {
                return this._src;
            }
            async _swapSrc(e) {
                if (((this._src = e), this.media.loadingState === a.default.EMPTY)) return;
                const t = null !== this._cachedPlaying ? this._cachedPlaying : !this.media.el.paused;
                return (
                    this.media.loadingState === a.default.LOADED && (this._currentTime = this.media.el.currentTime),
                    (this._cachedPlaying = t),
                    await this.media.load(`${e}#t=${this._currentTime}`),
                    (this._cachedPlaying = null),
                    t ? this.media.play() : Promise.resolve()
                );
            }
            destroy() {
                this._breakpointDetect.destroy(), super.destroy();
            }
        }
        t.default = l;
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        t.default = { small: 0, medium: 570, large: 780, xlarge: 1280 };
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(108)),
            r = s(i(192));
        class o extends n.default {
            constructor(e) {
                super(e);
            }
            _initialize() {
                (this._anim = this.options.anim),
                    (this._bpMap = this.options.animBreakpointMap || r.default),
                    (this._updateBreakpoint = this._updateBreakpoint.bind(this)),
                    (this._callback = this.options.callback),
                    this._addEventListeners(),
                    this._updateBreakpoint();
            }
            _addEventListeners() {
                this._anim.on("ON_BREAKPOINT_CHANGE", this._updateBreakpoint);
            }
            _removeEventListeners() {
                this._anim.off("ON_BREAKPOINT_CHANGE", this._updateBreakpoint);
            }
            _updateBreakpoint() {
                const e = this._bpMap[this._anim.model.pageMetrics.breakpoint];
                let t = !1;
                this._currentBreakpoint && this._currentBreakpoint !== e && (t = !0), (this._currentBreakpoint = e), t && this._callback();
            }
            destroy() {
                super.destroy();
            }
        }
        t.default = o;
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        t.default = { S: "small", M: "medium", L: "large", X: "xlarge" };
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.AnimPlayOnce = void 0);
        var n = s(i(107));
        class r extends n.default {
            constructor(e) {
                super(e), (this._playedOnce = !1);
            }
            async _onPlayKeyframeEnter() {
                return !1 === this._playedOnce ? ((this._playedOnce = !0), super._onPlayKeyframeEnter()) : null;
            }
        }
        t.AnimPlayOnce = r;
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.ShowOnEnd = void 0);
        var n = s(i(8));
        class r extends n.default {
            constructor(e) {
                super(e), (this._timelineGroup = e.anim.createTimeGroup()), (this._show = Array.from(document.querySelectorAll(this.media.el.getAttribute("data-show"))));
            }
            mounted() {
                this._show &&
                    this._show.forEach((e) => {
                        this._timelineGroup.addKeyframe(e, { start: 0, end: 0.25, opacity: [0, 1], ease: 1, easeFunction: "easeOutSin" });
                        let t = Array.from(e.querySelectorAll(".media-control"));
                        t &&
                            t.forEach((e) => {
                                e.addEventListener("focusin", () => {
                                    this.media.el.ended || (this._timelineGroup.play(), this.media.el.parentElement.classList.add("ended"));
                                });
                            });
                    });
            }
            get playbackState() {
                this.media.el.ended && this._timelineGroup.play();
            }
            destroy() {
                this._timelineGroup.remove(), (this._show.style = "");
            }
        }
        t.ShowOnEnd = r;
    },
    function (e, t, i) {
        "use strict";
        const s = i(6),
            n = i(196).default,
            { FullBleedBundle: r } = i(52),
            o = "modal-closed";
        e.exports = class extends s {
            constructor() {
                super(...arguments),
                    document.documentElement.classList.add(o),
                    (this.modalContent = this.el.querySelector(".modal-content")),
                    (this.modalTrigger = this.el.querySelector(".modal-trigger")),
                    (this.modalDisplayClass = "modal-display");
            }
            mounted() {
                this.modal = this.createModal();
                const e = this.modal.elements.container;
                this.modalContent.classList.contains(this.modalDisplayClass) && this.modalContent.classList.remove(this.modalDisplayClass),
                    (this.scrollGroup = this.anim.createScrollGroup(e, { getPosition: () => e.scrollTop, getMaxPosition: () => e.scrollHeight })),
                    (this.scrollGroup.name = "MODAL section"),
                    e.addEventListener("scroll", () => {
                        this.scrollGroup.updateTimeline();
                    }),
                    this.modalTrigger.addEventListener("click", () => this.openModal()),
                    this.addKeyframe({
                        el: e.querySelector(".chip-gradient-container"),
                        group: this.scrollGroup,
                        start: "t + css(--chip-anim-start)",
                        end: "t + css(--chip-anim-start) + css(--chip-anim-duration)",
                        "--gradient-position": [200, -100, "%"],
                        disabledWhen: "no-enhance-xp",
                    });
            }
            createModal() {
                return new (n.withMixins(...r))(this.modalContent, { attributes: { overlay: { "aria-labelledby": "modal-headline" }, container: { class: "theme-light scroll-modal" } } });
            }
            openModal() {
                this.modal.open(), document.documentElement.classList.remove(o), this.scrollGroup.forceUpdate();
            }
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(12)),
            r = s(i(197)),
            o = s(i(198)),
            a = s(i(203)),
            l = s(i(205)),
            h = s(i(206));
        const c = ["beforeCreate", "created", "beforeMount", "mounted", "onWillOpen", "onOpen", "onWillClose", "onClose", "onResizeImmediate", "onBreakpointChange", "onResizeDebounced", "destroy"],
            u = { attributes: {} };
        class d extends n.default {
            constructor(e) {
                var t;
                let i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : u;
                super(i),
                    (t = this),
                    (this.elements = {}),
                    (this.elements.content = e),
                    (this.options = i),
                    (this.opened = !1),
                    (this.model = Object.assign({}, JSON.parse(JSON.stringify(o.default)))),
                    (this.templates = {}),
                    c.forEach((e) => {
                        this[e] = function () {
                            for (var i = arguments.length, s = new Array(i), n = 0; n < i; n++) s[n] = arguments[n];
                            t[`__${e}`] && t[`__${e}`].forEach((e) => e.apply(t, s));
                        };
                    }),
                    this._bindEvents(),
                    ["beforeCreate", "created", "beforeMount"].forEach((e) => this[e](i));
            }
            appendContent(e, t) {
                (0, r.default)(e) && (t = t && (0, r.default)(t) ? t : this.elements.contentContainer).appendChild(e);
            }
            removeContent(e) {
                e ? (this.elements.container.contains(e) && e.remove(), this.trigger(this.model.Events.CONTENT_REMOVED)) : this._emptyContent();
            }
            scrollToModalTop() {
                this.elements.container.scrollTop = 0;
            }
            _emptyContent() {
                this.elements.contentContainer.innerHTML = "";
            }
            _bindEvents() {
                this.on(this.model.Events.WILLOPEN, this.onWillOpen),
                    this.on(this.model.Events.OPEN, this.onOpen),
                    this.on(this.model.Events.WILLCLOSE, this.onWillClose),
                    this.on(this.model.Events.CLOSE, this.onClose);
            }
            _releaseEvents() {
                this.off(this.model.Events.WILLOPEN, this.onWillOpen),
                    this.off(this.model.Events.OPEN, this.onOpen),
                    this.off(this.model.Events.WILLCLOSE, this.onwillClose),
                    this.off(this.model.Events.CLOSE, this.onClose);
            }
            static withMixins() {
                const e = class extends d {},
                    t = e.prototype;
                for (var i = arguments.length, s = new Array(i), n = 0; n < i; n++) s[n] = arguments[n];
                return (
                    [a.default, ...s, h.default, l.default].forEach((e) => {
                        for (const i in e) c.includes(i) ? ((t[`__${i}`] = t[`__${i}`] || []), t[`__${i}`].push(e[i])) : (t[i] = e[i]);
                    }),
                    e
                );
            }
        }
        var m = d;
        t.default = m;
    },
    function (e, t, i) {
        "use strict";
        e.exports = function (e) {
            return !(!e || !e.nodeType);
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(199)),
            r = s(i(200)),
            o = s(i(201)),
            a = {
                PageOverlay: { ClassNames: ["modal-page-overlay"] },
                FullBleed: { ClassNames: ["modal-full-bleed"] },
                Open: { Document: { ClassNames: ["has-modal"] }, Container: { ClassNames: ["modal-open"] } },
                Close: { Selector: "[data-modal-close]" },
                Elements: {
                    container: { Attributes: { class: "modal" }, Template: r.default },
                    contentContainer: { Selector: "[data-modal-element-content-container]" },
                    closeButton: {
                        Attributes: { class: "modal-close-button", "data-modal-close": "", "aria-label": "Close" },
                        ParentSelector: "[data-modal-close-button-parent]",
                        Template: o.default,
                    },
                    closeIcon: { Attributes: { class: "modal-close-icon", "data-modal-close": "" } },
                },
                DialogRole: { Selector: "[data-modal-element-overlay]", Attributes: { "aria-modal": "true", role: "dialog", tabindex: "-1", "aria-hidden": "true" } },
                Keyboard: { close: { keys: [n.default.ESCAPE] }, open: { keys: [] } },
                Events: { CONTENT_APPENDED: "contentappended", RENDERED: "rendered", WILLOPEN: "willopen", OPEN: "open", WILLCLOSE: "willclose", CLOSE: "close", CONTENT_REMOVED: "contentremoved" },
            };
        t.default = a;
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CONTROL: 17,
            ALT: 18,
            COMMAND: 91,
            CAPSLOCK: 20,
            ESCAPE: 27,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            ARROW_LEFT: 37,
            ARROW_UP: 38,
            ARROW_RIGHT: 39,
            ARROW_DOWN: 40,
            DELETE: 46,
            ZERO: 48,
            ONE: 49,
            TWO: 50,
            THREE: 51,
            FOUR: 52,
            FIVE: 53,
            SIX: 54,
            SEVEN: 55,
            EIGHT: 56,
            NINE: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            NUMPAD_ZERO: 96,
            NUMPAD_ONE: 97,
            NUMPAD_TWO: 98,
            NUMPAD_THREE: 99,
            NUMPAD_FOUR: 100,
            NUMPAD_FIVE: 101,
            NUMPAD_SIX: 102,
            NUMPAD_SEVEN: 103,
            NUMPAD_EIGHT: 104,
            NUMPAD_NINE: 105,
            NUMPAD_ASTERISK: 106,
            NUMPAD_PLUS: 107,
            NUMPAD_DASH: 109,
            NUMPAD_DOT: 110,
            NUMPAD_SLASH: 111,
            NUMPAD_EQUALS: 187,
            TICK: 192,
            LEFT_BRACKET: 219,
            RIGHT_BRACKET: 221,
            BACKSLASH: 220,
            SEMICOLON: 186,
            APOSTROPHE: 222,
            SPACEBAR: 32,
            CLEAR: 12,
            COMMA: 188,
            DOT: 190,
            SLASH: 191,
        };
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        t.default =
            '<div class="modal" data-modal-element-container data-modal-close>\n\t<div class="modal-overlay-container" data-modal-element-overlay-container data-modal-close>\n\t\t<div class="modal-overlay" data-modal-element-overlay data-modal-close-button-parent>\n\t\t\t<div class="modal-content-container" data-modal-element-content-container></div>\n\t\t</div>\n\t</div>\n</div>';
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = `<button data-modal-element-close-button>\n\t<span data-modal-element-close-icon>${s(i(202)).default}</span>\n</button>`;
        t.default = n;
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        t.default =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.12,10l4.07-4.06a1.5,1.5,0,1,0-2.11-2.12L10,7.88,5.94,3.81A1.5,1.5,0,1,0,3.82,5.93L7.88,10,3.81,14.06a1.5,1.5,0,0,0,0,2.12,1.51,1.51,0,0,0,2.13,0L10,12.12l4.06,4.07a1.45,1.45,0,0,0,1.06.44,1.5,1.5,0,0,0,1.06-2.56Z"/></svg>';
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(204)),
            r = {
                beforeCreate() {
                    document.body._animInfo
                        ? ((this.anim = document.body._animInfo.group.anim), this._setViewport(this.anim.model.pageMetrics))
                        : ((this.viewportEmitterMicro = new n.default()), (this.viewportEmitterMicro.CHANGE_EVENTS = n.default.CHANGE_EVENTS), this._setViewport(this.viewportEmitterMicro));
                },
                onBreakpointChange(e) {
                    this._setViewport(e), this._setPreviousViewport(e);
                },
                onOpen() {
                    this.opened = !0;
                },
                onClose() {
                    this.opened = !1;
                },
                _setViewport(e) {
                    this._viewport = this.anim ? this._getValidViewport(e.breakpoint) : this._getValidViewport(e.viewport);
                },
                _setPreviousViewport(e) {
                    this._previousViewport = this.anim ? this._getValidViewport(e.previousBreakpoint) : this._getValidViewport(e.oldViewport);
                },
                _getValidViewport(e) {
                    const t = { X: "L", L: "L", M: "M", S: "S" };
                    if (!Object.keys(t).includes(e)) throw `The viewport ${e} is not valid. Valid viewports are: ${Object.keys(t)}`;
                    return t[e] || "";
                },
            };
        t.default = r;
    },
    function (e, t, i) {
        "use strict";
        const s = i(3).EventEmitterMicro,
            n = [
                { name: "S", mediaQuery: "only screen and (max-width: 734px)" },
                { name: "M", mediaQuery: "only screen and (min-width: 735px) and (max-width: 1068px)" },
                { name: "L", mediaQuery: "only screen and (min-width: 1069px) and (max-width: 1440px)" },
                { name: "X", mediaQuery: "only screen and (min-width: 1441px)" },
            ],
            r = "only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)",
            o = "only screen and (orientation: portrait)";
        class a extends s {
            constructor() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                super(),
                    (this.BREAKPOINTS = e.breakpoints || n),
                    this._setupProperties(),
                    (this._onRetinaChange = this._onRetinaChange.bind(this)),
                    (this._onOrientationChange = this._onOrientationChange.bind(this)),
                    (this.listenersAdded = { orientation: !1, retina: !1, viewport: !1 });
            }
            static get CHANGE_EVENTS() {
                return { ORIENTATION: "change:orientation", RETINA: "change:retina", VIEWPORT: "change:viewport" };
            }
            on() {
                this._setupListeners(arguments[0]), super.on.apply(this, arguments);
            }
            _onRetinaChange() {
                this.trigger(a.CHANGE_EVENTS.RETINA, this);
            }
            _onOrientationChange() {
                this.trigger(a.CHANGE_EVENTS.ORIENTATION, this);
            }
            _setupProperties() {
                Object.defineProperty(this, "retina", { get: () => window.matchMedia(r).matches }),
                    Object.defineProperty(this, "orientation", { get: () => (window.matchMedia(o).matches ? "portrait" : "landscape") }),
                    (this.viewport = this.getBreakpoint());
            }
            _setupListeners(e) {
                if (
                    (e !== a.CHANGE_EVENTS.RETINA || this.listenersAdded.retina || (window.matchMedia(r).addListener(this._onRetinaChange), (this.listenersAdded.retina = !0)),
                    e !== a.CHANGE_EVENTS.ORIENTATION || this.listenersAdded.orientation || (window.matchMedia(o).addListener(this._onOrientationChange), (this.listenersAdded.orientation = !0)),
                    e === a.CHANGE_EVENTS.VIEWPORT && !this.listenersAdded.viewport)
                ) {
                    for (let e = 0; e < this.BREAKPOINTS.length; e++) {
                        let t = this.BREAKPOINTS[e];
                        window.matchMedia(t.mediaQuery).addListener((e) => {
                            e.matches && ((this.oldViewport = this.viewport), (this.viewport = t.name), this.trigger(a.CHANGE_EVENTS.VIEWPORT, this));
                        });
                    }
                    this.listenersAdded.viewport = !0;
                }
            }
            getBreakpoint() {
                for (let e = 0; e < this.BREAKPOINTS.length; e++) {
                    let t = this.BREAKPOINTS[e];
                    if (window.matchMedia(t.mediaQuery).matches) return t.name;
                }
            }
        }
        e.exports = a;
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var s = {
            created() {
                this._createModalElements();
            },
            beforeMount() {
                this._setDialogAriaLabel(), this.appendModalElements();
            },
            destroy() {
                document.body.removeChild(this.elements.container), this._releaseEvents();
                for (let e in this) Object.prototype.hasOwnProperty.call(this, e) && (this[e] = null);
            },
            getModalElementKey(e) {
                let t;
                for (const i in e.dataset)
                    if (i.includes("modalElement")) {
                        const e = i.substring("modalElement".length);
                        t = e[0].toLowerCase() + e.slice(1);
                    }
                return t;
            },
            appendContentElement() {
                this.appendContent(this.elements.content, this.elements.contentContainer), this.trigger(this.model.Events.CONTENT_APPENDED);
            },
            appendModalElements() {
                document.body.appendChild(this.elements.container), this.trigger(this.model.Events.RENDERED);
            },
            _createModalElements() {
                this._createTemplates(), this._createElementsFromTemplate();
                for (const e in this.templates) this._setChildElements(this.elements[e]);
                this._setDialogRoleElement(), this._setElementAttributes(), this.appendContentElement();
            },
            _createTemplates() {
                for (const e in this.model.Elements) {
                    const t = this.model.Elements[e].Template;
                    t && !this.templates[e] && (this.templates[e] = t);
                }
            },
            _createElementsFromTemplate() {
                for (const e in this.templates) this.elements[e] = new DOMParser().parseFromString(this.templates[e], "text/html").body.childNodes[0];
            },
            _setChildElements(e) {
                [...e.children].forEach((e) => {
                    this.getModalElementKey(e) && (this.elements[this.getModalElementKey(e)] = e), this._setChildElements(e);
                });
            },
            _setDialogRoleElement() {
                this.dialogRoleElement || (this.dialogRoleElement = this.elements.container.querySelector(this.model.DialogRole.Selector) || this.elements.container);
                for (const e in this.model.DialogRole.Attributes) this.dialogRoleElement.setAttribute(e, this.model.DialogRole.Attributes[e]);
            },
            _setElementAttributes() {
                let e = {},
                    t = {};
                for (const t in this.model.Elements) this.model.Elements[t].Attributes && (e[t] = this.model.Elements[t].Attributes);
                for (const i in e) {
                    t[i] = Object.assign({}, e[i], this.options.attributes[i]);
                    for (const i in this.options.attributes) "undefined" !== t[i] && (t[i] = Object.assign({}, e[i], this.options.attributes[i]));
                }
                for (const e in t)
                    for (const i in t[e]) {
                        let s = t[e][i];
                        if (!this.elements[e]) return;
                        if ("class" === i) Array.isArray(s) && (s = s.join(" ")), (this.elements[e].className = `${this.elements[e].className} ${s}`.trim());
                        else this.elements[e].setAttribute(i, s);
                    }
            },
            _setDialogAriaLabel() {
                if (this.elements.content && this.elements.content.dataset.modalDialogLabel) {
                    let e = this.elements.content.dataset.modalDialogLabel;
                    this.dialogRoleElement.setAttribute("aria-label", e);
                } else this.dialogRoleElement.hasAttribute("aria-label") || this.dialogRoleElement.hasAttribute("aria-labelledby") || this.dialogRoleElement.setAttribute("aria-label", "Modal");
            },
        };
        t.default = s;
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var s = {
            created() {
                this.options.gum ||
                    this._isVue ||
                    (this.anim
                        ? (this.anim.on(this.anim.model.PageEvents.ON_RESIZE_IMMEDIATE, this.onResizeImmediate),
                          this.anim.on(this.anim.model.PageEvents.ON_RESIZE_DEBOUNCED, this.onResizeDebounced),
                          this.anim.on(this.anim.model.PageEvents.ON_BREAKPOINT_CHANGE, this.onBreakpointChange))
                        : (window.addEventListener("resize", this.onResizeImmediate), this.viewportEmitterMicro.on(this.viewportEmitterMicro.CHANGE_EVENTS.VIEWPORT, this.onBreakpointChange)),
                    (this._mountedRaf = requestAnimationFrame(this.mounted)));
            },
            onResizeImmediate() {
                this.anim || (window.clearTimeout(this._resizeTimeout), (this._resizeTimeout = window.setTimeout(this.onResizeDebounced, 250)));
            },
            destroy() {
                cancelAnimationFrame(this._mountedRaf),
                    this.anim
                        ? (this.anim.off(this.anim.model.PageEvents.ON_RESIZE_IMMEDIATE, this.onResizeImmediate),
                          this.anim.off(this.anim.model.PageEvents.ON_RESIZE_DEBOUNCED, this.onResizeDebounced),
                          this.anim.off(this.anim.model.PageEvents.ON_BREAKPOINT_CHANGE, this.onBreakpointChange))
                        : (window.removeEventListener("resize", this.onResizeImmediate), this.viewportEmitterMicro.off(this.viewportEmitterMicro.CHANGE_EVENTS.VIEWPORT, this.onBreakpointChange));
            },
        };
        t.default = s;
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var s = {
            created() {
                this.close = this.close.bind(this);
            },
            onWillOpen() {
                this._attachCloseEvents();
            },
            onClose() {
                this._removeCloseEvents(),
                    document.documentElement.classList.remove(...this.model.Open.Document.ClassNames),
                    this.elements.container.classList.remove(...this.model.Open.Container.ClassNames);
            },
            mounted() {
                this.close.elements = Array.from(document.querySelectorAll(this.model.Close.Selector));
            },
            destroy() {
                this.close();
            },
            close(e) {
                this.opened && ((e && "click" === e.type && !this.close.elements.includes(e.target)) || (this.trigger(this.model.Events.WILLCLOSE), this.trigger(this.model.Events.CLOSE)));
            },
            _removeCloseEvents() {
                this.elements.container && this.elements.container.removeEventListener("click", this.close);
            },
            _attachCloseEvents() {
                this.elements.container && this.elements.container.addEventListener("click", this.close);
            },
        };
        t.default = s;
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var s = {
            created() {
                this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
            },
            beforeMount() {
                this._setCloseAriaLabel(), this.appendCloseButton();
            },
            mounted() {
                this.elements.closeButton.addEventListener("click", this.onCloseButtonClick);
            },
            destroy() {
                this.elements.closeButton.removeEventListener("click", this.onCloseButtonClick);
            },
            appendCloseButton() {
                (this.elements.container.querySelector(this.model.Elements.closeButton.ParentSelector) || this.elements.container).appendChild(this.elements.closeButton);
            },
            onCloseButtonClick(e) {
                this.close(e);
            },
            _setCloseAriaLabel() {
                if (this.elements.content && this.elements.content.dataset.modalCloseLabel) {
                    let e = this.elements.content.dataset.modalCloseLabel;
                    this.elements.closeButton.setAttribute("aria-label", e);
                }
            },
        };
        t.default = s;
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(93)),
            r = s(i(14)),
            o = {
                created() {
                    this.scrollToModalTop = this.scrollToModalTop.bind(this);
                },
                mounted() {
                    r.default.getTabbableElements(this.dialogRoleElement).length && (this._circularTab = new n.default(this.dialogRoleElement));
                },
                onOpen() {
                    this._giveModalFocus();
                },
                onWillClose() {
                    this._removeModalFocus();
                },
                destroy() {
                    clearTimeout(this._focusTimeout), this._removeModalFocus(), this._circularTab && this._circularTab.destroy();
                },
                _giveModalFocus() {
                    this.dialogRoleElement.removeAttribute("aria-hidden"),
                        this.elements.container.classList.add("modal-touch-lock"),
                        (this._activeElement = document.activeElement),
                        this._circularTab && this._circularTab.start(!0),
                        this.elements.container.addEventListener("scroll", this.scrollToModalTop),
                        (this._focusTimeout = setTimeout(() => {
                            this.dialogRoleElement.focus({ preventScroll: !0 }),
                                requestAnimationFrame(() => {
                                    this.elements.container.removeEventListener("scroll", this.scrollToModalTop), this.elements.container.classList.remove("modal-touch-lock");
                                });
                        }, 300));
                },
                _removeModalFocus() {
                    this._circularTab && this._circularTab.stop(),
                        this.dialogRoleElement.setAttribute("aria-hidden", "true"),
                        this.elements.container.removeEventListener("scroll", this.scrollToModalTop),
                        this._activeElement && (this._activeElement.focus(), (this._activeElement = null));
                },
            };
        t.default = o;
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var s = {
            beforeCreate() {
                this.model.Open.Document.ClassNames.push("has-modal-full-bleed");
            },
            beforeMount() {
                this.elements.container.classList.add(...this.model.FullBleed.ClassNames);
            },
            destroy() {
                this.elements.container.classList.remove(...this.model.FullBleed.ClassNames);
            },
        };
        t.default = s;
    },
    function (e, t, i) {
        "use strict";
        const s = i(212);
        e.exports = {
            beforeCreate() {
                (this._keysToOpen = this.model.Keyboard.open.keys), (this._keysToClose = this.model.Keyboard.close.keys), (this._enabledKeysToOpen = []), (this._enabledKeysToClose = []);
            },
            onWillOpen() {
                this._keysToOpen.forEach(this.disableKeyToOpen, this), this._keysToClose.forEach(this.enableKeyToClose, this);
            },
            onWillClose() {
                this._keysToOpen.forEach(this.enableKeyToOpen, this), this._keysToClose.forEach(this.disableKeyToClose, this);
            },
            destroy() {
                this._keysToOpen.forEach(this.disableKeyToOpen, this), this._keysToClose.forEach(this.disableKeyToClose, this);
            },
            addKeyToOpen(e) {
                -1 === this._keysToOpen.indexOf(e) && (this._keysToOpen.push(e), this.enableKeyToOpen(e));
            },
            addKeyToClose(e) {
                -1 === this._keysToClose.indexOf(e) && (this._keysToClose.push(e), this.enableKeyToClose(e));
            },
            removeKeyToOpen(e) {
                const t = this._keysToOpen.indexOf(e);
                -1 !== t && (this._keysToOpen.splice(t, 1), this.disableKeyToOpen(e));
            },
            removeAllKeysToOpen() {
                this._keysToOpen.forEach(this.disableKeyToOpen, this), this._keysToOpen.splice(0, this._keysToOpen.length);
            },
            removeKeyToClose(e) {
                const t = this._keysToClose.indexOf(e);
                -1 !== t && (this._keysToClose.splice(t, 1), this.disableKeyToClose(e));
            },
            removeAllKeysToClose() {
                this._keysToClose.forEach(this.disableKeyToClose, this), this._keysToClose.splice(0, this._keysToClose.length);
            },
            enableKeyToOpen(e) {
                -1 === this._enabledKeysToOpen.indexOf(e) && (s.onUp(e, this.open, this), this._enabledKeysToOpen.push(e));
            },
            enableKeyToClose(e) {
                -1 === this._enabledKeysToClose.indexOf(e) && (s.onUp(e, this.close, this), this._enabledKeysToClose.push(e));
            },
            disableKeyToOpen(e) {
                const t = this._enabledKeysToOpen.indexOf(e);
                -1 !== t && (s.offUp(e, this.open, this), this._enabledKeysToOpen.splice(t, 1));
            },
            disableKeyToClose(e) {
                const t = this._enabledKeysToClose.indexOf(e);
                -1 !== t && (s.offUp(e, this.close, this), this._enabledKeysToClose.splice(t, 1));
            },
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(213);
        e.exports = new s();
    },
    function (e, t, i) {
        "use strict";
        const s = i(12),
            n = i(214),
            r = "keydown",
            o = "keyup";
        e.exports = class extends s {
            constructor(e) {
                super(),
                    (this._keysDown = {}),
                    (this._DOMKeyDown = this._DOMKeyDown.bind(this)),
                    (this._DOMKeyUp = this._DOMKeyUp.bind(this)),
                    (this._context = e || document),
                    this._context.addEventListener(r, this._DOMKeyDown, !0),
                    this._context.addEventListener(o, this._DOMKeyUp, !0);
            }
            onDown(e, t) {
                return this.on("keydown:" + e, t);
            }
            onceDown(e, t) {
                return this.once("keydown:" + e, t);
            }
            offDown(e, t) {
                return this.off("keydown:" + e, t);
            }
            onUp(e, t) {
                return this.on("keyup:" + e, t);
            }
            onceUp(e, t) {
                return this.once("keyup:" + e, t);
            }
            offUp(e, t) {
                return this.off("keyup:" + e, t);
            }
            isDown(e) {
                return (e += ""), this._keysDown[e] || !1;
            }
            isUp(e) {
                return !this.isDown(e);
            }
            destroy() {
                return (
                    this._context.removeEventListener(r, this._DOMKeyDown, !0),
                    this._context.removeEventListener(o, this._DOMKeyUp, !0),
                    (this._keysDown = null),
                    (this._context = null),
                    super.destroy(),
                    this
                );
            }
            _DOMKeyDown(e) {
                var t = this._normalizeKeyboardEvent(e),
                    i = (t.keyCode += "");
                this._trackKeyDown(i), this.trigger("keydown:" + i, t);
            }
            _DOMKeyUp(e) {
                var t = this._normalizeKeyboardEvent(e),
                    i = (t.keyCode += "");
                this._trackKeyUp(i), this.trigger("keyup:" + i, t);
            }
            _normalizeKeyboardEvent(e) {
                return new n(e);
            }
            _trackKeyUp(e) {
                this._keysDown[e] && (this._keysDown[e] = !1);
            }
            _trackKeyDown(e) {
                this._keysDown[e] || (this._keysDown[e] = !0);
            }
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(215),
            n = ["keyLocation", "keyIdentifier"];
        e.exports = class {
            constructor(e) {
                this.originalEvent = e;
                for (let t in e) -1 === n.indexOf(t) && "function" != typeof e[t] && (this[t] = e[t]);
                this.keyCode || (this.keyCode = this._getKeyCode()), (this.location = void 0 !== this.originalEvent.location ? this.originalEvent.location : this.originalEvent.keyLocation);
            }
            preventDefault() {
                if ("function" == typeof this.originalEvent.preventDefault) return this.originalEvent.preventDefault();
                this.originalEvent.returnValue = !1;
            }
            stopPropagation() {
                return this.originalEvent.stopPropagation();
            }
            _getKeyCode() {
                return s[this.code] || -1;
            }
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            Backspace: 8,
            Tab: 9,
            Enter: 13,
            NumpadEnter: 13,
            ShiftLeft: 16,
            ShiftRight: 16,
            ControlLeft: 17,
            ControlRight: 17,
            AltLeft: 18,
            AltRight: 18,
            CapsLock: 20,
            Escape: 27,
            PageUp: 33,
            PageDown: 34,
            End: 35,
            Home: 36,
            ArrowLeft: 37,
            ArrowUp: 38,
            ArrowRight: 39,
            ArrowDown: 40,
            Delete: 46,
            Digit0: 48,
            Digit1: 49,
            Digit2: 50,
            Digit3: 51,
            Digit4: 52,
            Digit5: 53,
            Digit6: 54,
            Digit7: 55,
            Digit8: 56,
            Digit9: 57,
            KeyA: 65,
            KeyB: 66,
            KeyC: 67,
            KeyD: 68,
            KeyE: 69,
            KeyF: 70,
            KeyG: 71,
            KeyH: 72,
            KeyI: 73,
            KeyJ: 74,
            KeyK: 75,
            KeyL: 76,
            KeyM: 77,
            KeyN: 78,
            KeyO: 79,
            KeyP: 80,
            KeyQ: 81,
            KeyR: 82,
            KeyS: 83,
            KeyT: 84,
            KeyU: 85,
            KeyV: 86,
            KeyW: 87,
            KeyX: 88,
            KeyY: 89,
            KeyZ: 90,
            Numpad0: 96,
            Numpad1: 97,
            Numpad2: 98,
            Numpad3: 99,
            Numpad4: 100,
            Numpad5: 101,
            Numpad6: 102,
            Numpad7: 103,
            Numpad8: 104,
            Numpad9: 105,
            NumpadMultiply: 106,
            NumpadAdd: 107,
            NumpadSubtract: 109,
            NumpadDecimal: 110,
            NumpadDivide: 111,
            NumpadEqual: 187,
            Backquote: 192,
            BracketLeft: 219,
            BracketRight: 221,
            Backslash: 220,
            Semicolon: 186,
            Quote: 222,
            Space: 32,
            Equal: 187,
            Comma: 188,
            Minus: 189,
            Period: 190,
            Slash: 191,
        };
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var s = {
            created() {
                this.open = this.open.bind(this);
            },
            onWillOpen() {
                document.documentElement.classList.add(...this.model.Open.Document.ClassNames), this.elements.container.classList.add(...this.model.Open.Container.ClassNames), this.scrollToModalTop();
            },
            open() {
                this.opened || (this.trigger(this.model.Events.WILLOPEN), this.trigger(this.model.Events.OPEN));
            },
        };
        t.default = s;
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var s = {
            beforeCreate() {
                this.model.Open.Document.ClassNames.push("has-modal-page-overlay"), (this._scrollBarWidth = 0);
            },
            beforeMount() {
                this.elements.container.classList.add(...this.model.PageOverlay.ClassNames);
            },
            mounted() {
                this._saveScrollBarWidth();
            },
            onResizeDebounced() {
                this.opened || this._saveScrollBarWidth();
            },
            onWillOpen() {
                document.documentElement.style.setProperty("--modal-scrollbar-buffer", this._scrollBarWidth);
            },
            onClose() {
                document.documentElement.style.removeProperty("--modal-scrollbar-buffer");
            },
            destroy() {
                this.elements.container.classList.remove(...this.model.PageOverlay.ClassNames);
            },
            _saveScrollBarWidth() {
                this._scrollBarWidth = window.innerWidth - document.body.clientWidth + "px";
            },
        };
        t.default = s;
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var s = {
            created() {
                (this._scrollX = 0), (this._scrollY = 0);
            },
            onWillOpen() {
                this._saveScrollPosition();
            },
            onClose() {
                this._restoreScrollPosition();
            },
            _saveScrollPosition() {
                (this._scrollX = document.documentElement.scrollLeft), (this._scrollY = document.documentElement.scrollTop);
            },
            _restoreScrollPosition() {
                window.scrollTo(this._scrollX, this._scrollY);
            },
        };
        t.default = s;
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var s = i(52),
            n = [s.Close, s.CloseButton];
        t.default = n;
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var s = i(52),
            n = [...s.CloseBundle, s.Focus, s.Keyboard, s.Open, s.FullBleed, s.ScrollPosition];
        t.default = n;
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var s = i(52),
            n = [...s.CloseBundle, s.Focus, s.Keyboard, s.Open, s.PageOverlay, s.ScrollPosition];
        t.default = n;
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.PerformanceGallery = void 0);
        var n = s(i(223));
        const r = i(6);
        class o extends r {
            constructor(e) {
                super(e), (this._initialzeGallery = this._initialzeGallery.bind(this)), (this._initialized = !1);
                const t = {
                    itemsCreated() {
                        let e = this.tabNav.items,
                            t = e[e.length - 1];
                        (this.lastItemIndex = t.index), (this.tablistWrapper = this.el.querySelector(".tablist-wrapper"));
                    },
                    onItemChangeCompleted(e) {
                        this.lastItemIndex &&
                            (this.currentIndex === this.lastItemIndex ? this.tablistWrapper.classList.add("last-item-active") : this.tablistWrapper.classList.remove("last-item-active"));
                    },
                };
                let i = new n.default();
                (i.defaultMixin.AddLastItemActive = t), this._initialzeGallery(i);
            }
            mounted() {
                document.body.hasAttribute("data-component-list") && this.rebaseStyles();
            }
            rebaseStyles() {
                const e = this.gum.getComponentOfType("ReBase", document.body),
                    t = this.anim.getGroupForTarget(this.el);
                e.keepGroupNameAlive(t.name);
            }
            _initialzeGallery(e) {
                this.anim.addEvent(this.el, {
                    start: "t - 100vh + 90%",
                    end: "b - 25vh",
                    event: "Initialize Gallery Event",
                    onEnter: (t) => {
                        this._initialized || (e.create(this.el), (this._initialized = !0));
                    },
                });
            }
        }
        (t.PerformanceGallery = o), (e.exports = o);
    },
    function (e, t, i) {
        "use strict";
        var s = i(0);
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
        var n = s(i(98)),
            r = s(i(103)),
            o = s(i(224)),
            a = s(i(102)),
            l = s(i(101)),
            h = s(i(225)),
            c = s(i(226)),
            u = s(i(227));
        const d = i(99);
        t.default = class {
            constructor() {
                const e = { itemsSelector: ".tabnav-items", itemSelector: ".tabnav-link", scrollEasing: "ease-out", scrollDuration: 0.5, usePaddles: !1 };
                let t = {
                    beforeCreate() {
                        (this.model.IsRTL = "rtl" === document.documentElement.getAttribute("dir")),
                            (this.model.IsTouch = "ontouchstart" in document.documentElement),
                            "S" === this.model.pageMetrics.breakpoint && (this.scrollTabNav = new u.default(this.el, e));
                    },
                    onItemChangeCompleted() {
                        "S" === this.model.pageMetrics.breakpoint && this.scrollTabNav && this.scrollTabNav.centerItem(this.el.querySelector(".current"));
                    },
                    onBreakpointChange(t) {
                        "S" === t.breakpoint && ((this.scrollTabNav = this.scrollTabNav || new u.default(this.el, e)), this.scrollTabNav.centerItem(this.tabNav.current.el));
                    },
                };
                this.defaultMixin = {
                    Analytics: r.default,
                    TabNav: o.default,
                    Fade: d,
                    SelectDeselectOnChangeOccurred: a.default,
                    SharedTimeline: h.default,
                    BarsAnimation: c.default,
                    KeyboardNavigation: l.default,
                    CustomizeModel: t,
                };
            }
            removeMixins() {
                arguments.length &&
                    arguments.forEach((e) => {
                        this.defaultMixin[e] && delete this.defaultMixin[e];
                    });
            }
            withMixins() {
                let e = [];
                for (let t in this.defaultMixin) e.push(this.defaultMixin[t]);
                this.gallery = n.default.withMixins(...e, ...arguments);
            }
            create(e) {
                return this.removeMixins(), this.withMixins(), new this.gallery({ el: e });
            }
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(47),
            n = i(7),
            r = i(22);
        e.exports = {
            created() {
                this.tabNav = { items: [], current: null };
            },
            itemsCreated() {
                Array.from(this.el.querySelectorAll(this.model.TabNav.ItemSelector)).forEach((e, t) => {
                    const i = new o(e, t),
                        s = this.getItemForTrigger(i.trigger);
                    s ||
                        console.error(
                            `MixinGallery '${this.el.id}': Could not match tav/dot nav item with trigger '${i.trigger}', to gallery any item. Double check to make sure the triggers match the item id's.`
                        ),
                        (i.onSelected = (e) => {
                            (this.lastInteractionEvent = e), e.preventDefault();
                            let i = t - this.wrappedIndex(this.currentIndex),
                                s = this.currentIndex + i;
                            this.animateToItem(s);
                        }),
                        s.on("select", () => {
                            e.classList.add("current"), i.anchorEl.classList.add("current");
                        }),
                        s.on("deselect", () => {
                            e.classList.remove("current"), i.anchorEl.classList.remove("current");
                        }),
                        i.anchorEl.addEventListener("click", i.onSelected),
                        this.tabNav.items.push(i);
                }),
                    this._items.forEach((e, t) => {
                        e.el.setAttribute("role", r.TABPANEL), e.el.setAttribute(n.LABELLEDBY, this.tabNav.items[t].anchorEl.id), this.tabNav.items[t].anchorEl.setAttribute(n.CONTROLS, e.el.id);
                    });
            },
            mounted() {
                const e = this.tabNav.items[0].el.parentElement;
                this.roamingTabIndex = new s(e, { selector: this.model.TabNav.RoamingTabIndexSelector });
            },
            onItemChangeCompleted(e) {
                let t = this.tabNav.items.filter((t) => t.trigger === e.current.id)[0];
                this.setCurrentItem(t), this.roamingTabIndex.setSelectedItemByIndex(t.index, !0), document.activeElement.parentElement.parentElement === t.el.parentElement && t.anchorEl.focus();
            },
            setCurrentItem(e) {
                e !== this.tabNav.current && (this.tabNav.current = e);
            },
        };
        class o {
            constructor(e, t) {
                (this.el = e),
                    (this.index = t),
                    (this.anchorEl = e.querySelector("a")),
                    (this.trigger = this.anchorEl.getAttribute("data-ac-gallery-trigger")),
                    this.anchorEl.setAttribute("role", r.TAB);
            }
        }
    },
    function (e, t, i) {
        "use strict";
        const s = i(43);
        e.exports = {
            beforeCreate() {
                (this._onSharedTimelineComplete = this._onSharedTimelineComplete.bind(this)), (this._sharedTimeline = null);
            },
            getSharedTimeline() {
                return this._sharedTimeline;
            },
            createTimeline() {
                return s.createTimeGroup(...arguments);
            },
            animateToItem(e) {
                this._sharedTimeline && this._sharedTimeline.off("ON_TIMELINE_COMPLETE", this._onSharedTimelineComplete),
                    (this._sharedTimeline = this.createTimeline(this.el)),
                    this.trigger("ITEM_CHANGE_INITIATED", { next: this._items[this.wrappedIndex(e)] }),
                    this._sharedTimeline.on("ON_TIMELINE_START", () => {
                        (this.currentIndex = e), this.trigger("ITEM_CHANGE_OCCURRED", { current: this.currentItem });
                    }),
                    this._sharedTimeline.on("ON_TIMELINE_COMPLETE", this._onSharedTimelineComplete),
                    this._sharedTimeline.play();
            },
            _onSharedTimelineComplete() {
                this._sharedTimeline = null;
            },
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = {
            itemsCreated(e) {
                this.el.querySelectorAll(".bars-container").forEach((e) => {
                    let t = e.querySelectorAll(".bar-mask"),
                        i = 0;
                    t.forEach((e) => {
                        let t = e.getAttribute("data-bar-width") || 1,
                            s = parseFloat(t);
                        i || (i = 100 / s), (e.style.width = s * i + "%");
                    });
                }),
                    this.animateToItem(0),
                    this.el.classList.add("ready");
            },
            animateToItem(e) {
                if (!this.model.PrefersReducedMotion) {
                    const t = this._items[this.wrappedIndex(e)];
                    this.addBarAnimationKeyframes(this.currentItem, t, this.getSharedTimeline());
                }
            },
            addBarAnimationKeyframes(e, t, i) {
                const s = [...t.el.querySelectorAll(".bar")];
                s.reverse().forEach((e, t) => {
                    i.addKeyframe(e, { start: 0.6 - 0.1 * t, end: 1.8 - 0.1 * t, x: ["-100%w", "0%w"], opacity: [0, 1], easeFunction: "easeOutCubic" });
                });
            },
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(109),
            n = i(228),
            r = i(229).Clip,
            o = i(243);
        function a(e, t) {
            (this.el = e),
                (this._options = t || {}),
                (this._wrapper = this.el.querySelector(this._options.itemsSelector)),
                (this._items = Array.prototype.slice.call(this.el.querySelectorAll(this._options.itemSelector))),
                (this.lastCenteredItem = this._items[0]),
                (this._isRightToLeft = "rtl" === window.getComputedStyle(e).direction),
                (this._inlineStart = this._isRightToLeft ? "right" : "left"),
                (this._inlineEnd = this._isRightToLeft ? "left" : "right"),
                (this._scrollType = this._scrollDirection()),
                (this._usePaddles = void 0 === this._options.usePaddles ? o() : this._options.usePaddles),
                (this.centerItem = this.centerItem.bind(this)),
                (this._onScrollClipUpdate = this._onScrollClipUpdate.bind(this)),
                this._init();
        }
        var l = a.prototype;
        (l._init = function () {
            this._usePaddles && this._setupPaddles();
        }),
            (l.centerItem = function (e, t) {
                this.lastCenteredItem = e;
                var i = 0.5 * s(this.el).width,
                    r = n(e).left + 0.5 * s(e).width,
                    o = Math.round(r - i);
                t ? (this.el.scrollLeft = this._setNormalizedScroll(o)) : (this._destroyCurrentClip(), this._isRightToLeft && (o *= -1), this._smoothScrollTo(o));
            }),
            (l._getPaddles = function () {
                var e = this._isRightToLeft ? this._options.rightPaddleSelector : this._options.leftPaddleSelector,
                    t = this._isRightToLeft ? this._options.leftPaddleSelector : this._options.rightPaddleSelector;
                return { start: this.el.querySelector(e), end: this.el.querySelector(t) };
            }),
            (l._setupPaddles = function () {
                this.el.classList.add("with-paddles"),
                    (this._paddles = this._getPaddles()),
                    (this._children = this._wrapper.children),
                    (this._childCount = this._wrapper.children.length),
                    (this._onScrollClipComplete = this._onScrollClipComplete.bind(this)),
                    (this._onPaddleStartClick = this._onPaddleStartClick.bind(this)),
                    this._paddles.start.addEventListener("click", this._onPaddleStartClick),
                    (this._onPaddleEndClick = this._onPaddleEndClick.bind(this)),
                    this._paddles.end.addEventListener("click", this._onPaddleEndClick),
                    (this._onScroll = this._onScroll.bind(this)),
                    this._wrapper.addEventListener("scroll", this._onScroll),
                    (this._updateElementMetrics = this._updateElementMetrics.bind(this)),
                    window.addEventListener("resize", this._updateElementMetrics),
                    window.addEventListener("orientationchange", this._updateElementMetrics),
                    this._updateElementMetrics();
            }),
            (l._updateElementMetrics = function () {
                (this._wrapperWidth = this._wrapper.offsetWidth),
                    (this._contentWidth = this._wrapper.scrollWidth),
                    this._contentWidth <= this._wrapperWidth && (this._destroyCurrentClip(), 0 !== this._wrapper.scrollLeft && (this._wrapper.scrollLeft = 0)),
                    (this._scrollStart = this._wrapper.scrollLeft),
                    this._usePaddles && ((this._paddleWidth = this._paddles.start.offsetWidth), this._updatePaddleDisplay());
            }),
            (l._onScroll = function () {
                this._lockPaddles || ((this._scrollStart = this._wrapper.scrollLeft), this._updatePaddleDisplay());
            }),
            (l._updatePaddleDisplay = function () {
                var e = this._getNormalizedScroll(this._scrollStart) + this._wrapperWidth;
                (this._paddles.start.disabled = this._getNormalizedScroll(this._scrollStart) <= 1), (this._paddles.end.disabled = e >= this._contentWidth - 1);
            }),
            (l._onPaddleStartClick = function (e) {
                this._smoothScrollTo(this._getPaddleStartScrollDestination());
            }),
            (l._getPaddleStartScrollDestination = function () {
                var e,
                    t,
                    i = this._getNormalizedScroll(this._scrollStart);
                for (t = this._childCount - 1; t > 0; t--) if ((e = this._normalizePosition(n(this._children[t])))[this._inlineStart] < i) return e[this._inlineEnd] - this._wrapperWidth;
                return 0;
            }),
            (l._onPaddleEndClick = function (e) {
                this._smoothScrollTo(this._getPaddleEndScrollDestination());
            }),
            (l._getPaddleEndScrollDestination = function () {
                var e,
                    t,
                    i = this._getNormalizedScroll(this._scrollStart) + this._wrapperWidth;
                for (t = 0; t < this._childCount; t++) if ((e = this._normalizePosition(n(this._children[t])))[this._inlineEnd] > i) return e[this._inlineStart];
                return this._contentWidth;
            }),
            (l._getBoundedScrollX = function (e) {
                var t = this._contentWidth - this._wrapperWidth;
                return Math.max(Math.min(e, t), 0);
            }),
            (l._smoothScrollTo = function (e) {
                if ((this._updateElementMetrics(), !this._lockPaddles && e !== this._scrollStart)) {
                    var t = { scrollLeft: this._wrapper.scrollLeft },
                        i = { scrollLeft: this._setNormalizedScroll(e) },
                        s = { ease: this._options.scrollEasing, onUpdate: this._onScrollClipUpdate };
                    this._usePaddles && ((this._lockPaddles = !0), (s.onComplete = this._onScrollClipComplete)), (this._clip = r.to(t, this._options.scrollDuration, i, s));
                }
            }),
            (l._onScrollClipUpdate = function (e) {
                this._scrollStart = this._wrapper.scrollLeft = Math.round(e.target().scrollLeft);
            }),
            (l._onScrollClipComplete = function () {
                this._updatePaddleDisplay(), (this._lockPaddles = !1);
            }),
            (l._scrollDirection = function () {
                var e = "reverse",
                    t = document.createElement("div");
                return (
                    (t.style.cssText = "width:2px; height:1px; position:absolute; top:-1000px; overflow:scroll; font-size: 14px;"),
                    (t.style.direction = "rtl"),
                    (t.innerHTML = "test"),
                    document.body.appendChild(t),
                    t.scrollLeft > 0 ? (e = "default") : ((t.scrollLeft = 1), 0 === t.scrollLeft && (e = "negative")),
                    document.body.removeChild(t),
                    e
                );
            }),
            (l._getNormalizedScroll = function (e) {
                if (!this._isRightToLeft) return e;
                var t = Math.abs(e);
                return "default" === this._scrollType && (t = this._contentWidth - this._wrapperWidth - t), t;
            }),
            (l._setNormalizedScroll = function (e) {
                var t = this._getBoundedScrollX(e);
                return this._isRightToLeft && "reverse" !== this._scrollType ? ("negative" === this._scrollType ? -t : -(t - this._contentWidth + this._wrapperWidth)) : t;
            }),
            (l._normalizePosition = function (e) {
                return this._isRightToLeft
                    ? { top: e.top, right: this._wrapperWidth - e.right + this._paddleWidth, bottom: e.bottom, left: this._wrapperWidth - e.left + this._paddleWidth }
                    : { top: e.top, right: e.right - this._paddleWidth, bottom: e.bottom, left: e.left - this._paddleWidth };
            }),
            (l._destroyCurrentClip = function () {
                this._clip && this._clip.playing() && (this._clip.destroy(), (this._lockPaddles = !1));
            }),
            (l._destroyPaddles = function () {
                this._paddles.start.removeEventListener("click", this._onPaddleStartClick),
                    this._paddles.end.removeEventListener("click", this._onPaddleEndClick),
                    this._wrapper.removeEventListener("scroll", this._onScroll),
                    (this._paddles = null);
            }),
            (l.destroy = function () {
                (this._items = null),
                    this._destroyCurrentClip(),
                    this._destroyPaddles(),
                    window.removeEventListener("resize", this._updateElementMetrics),
                    window.removeEventListener("orientationchange", this._updateElementMetrics);
            }),
            (e.exports = a);
    },
    function (e, t, i) {
        "use strict";
        var s = i(109);
        e.exports = function (e, t) {
            var i, n, r, o, a, l, h;
            return (
                t
                    ? ((n = (i = e.getBoundingClientRect()).top),
                      (r = i.left),
                      (o = i.width),
                      (a = i.height),
                      e.offsetParent && ((n -= (l = e.offsetParent.getBoundingClientRect()).top), (r -= l.left)))
                    : ((h = s(e, t)), (n = e.offsetTop), (r = e.offsetLeft), (o = h.width), (a = h.height)),
                { top: n, right: r + o, bottom: n + a, left: r }
            );
        };
    },
    function (e, t, i) {
        "use strict";
        e.exports = { Clip: i(230) };
    },
    function (e, t, i) {
        "use strict";
        i(231);
        var s = i(232),
            n = i(110).createPredefined,
            r = i(238),
            o = i(110).Ease,
            a = i(241).EventEmitterMicro;
        function l(e, t, i, s) {
            (s = s || {}),
                (this._options = s),
                (this._isYoyo = s.yoyo),
                (this._direction = 1),
                (this._timeScale = 1),
                (this._loop = s.loop || 0),
                (this._loopCount = 0),
                (this._target = e),
                this.duration(t),
                (this._delay = 1e3 * (s.delay || 0)),
                (this._remainingDelay = this._delay),
                (this._progress = 0),
                (this._clock = s.clock || r),
                (this._playing = !1),
                (this._getTime =
                    Date.now ||
                    function () {
                        return new Date().getTime();
                    }),
                (this._propsTo = i || {}),
                (this._propsFrom = s.propsFrom || {}),
                (this._onStart = s.onStart || null),
                (this._onUpdate = s.onUpdate || null),
                (this._onDraw = s.onDraw || null),
                (this._onComplete = s.onComplete || null);
            var h = s.ease || "ease";
            (this._ease = "function" == typeof h ? new o(h) : n(h)),
                (this._start = this._start.bind(this)),
                (this._update = this._update.bind(this)),
                (this._draw = this._draw.bind(this)),
                (this._isPrepared = !1),
                l._add(this),
                a.call(this);
        }
        var h = (l.prototype = s(a.prototype));
        (l.COMPLETE = "complete"),
            (l.PAUSE = "pause"),
            (l.PLAY = "play"),
            (h.play = function () {
                return (
                    this._playing ||
                        ((this._playing = !0),
                        0 === this._delay || 0 === this._remainingDelay
                            ? this._start()
                            : (this._isPrepared || (this._setDiff(), this._updateProps()),
                              (this._startTimeout = setTimeout(this._start, this._remainingDelay / this._timeScale)),
                              (this._delayStart = this._getTime()))),
                    this
                );
            }),
            (h.pause = function () {
                return (
                    this._playing && (this._startTimeout && ((this._remainingDelay = this._getTime() - this._delayStart), clearTimeout(this._startTimeout)), this._stop(), this.trigger(l.PAUSE, this)),
                    this
                );
            }),
            (h.destroy = function () {
                return (
                    this.pause(),
                    (this._options = null),
                    (this._target = null),
                    (this._storeTarget = null),
                    (this._ease = null),
                    (this._clock = null),
                    (this._propsTo = null),
                    (this._propsFrom = null),
                    (this._storePropsTo = null),
                    (this._storePropsFrom = null),
                    (this._propsDiff = null),
                    (this._propsEase = null),
                    (this._onStart = null),
                    (this._onUpdate = null),
                    (this._onDraw = null),
                    (this._onComplete = null),
                    l._remove(this),
                    a.prototype.destroy.call(this),
                    this
                );
            }),
            (h.reset = function () {
                if (this._isPrepared)
                    return (
                        this._stop(),
                        this._resetLoop(this._target, this._storeTarget),
                        (this._direction = 1),
                        (this._loop = this._options.loop || 0),
                        (this._loopCount = 0),
                        (this._propsFrom = this._storePropsFrom),
                        (this._propsTo = this._storePropsTo),
                        (this._progress = 0),
                        this._setStartTime(),
                        this._onUpdate && this._onUpdate.call(this, this),
                        this._onDraw && this._onDraw.call(this, this),
                        this
                    );
            }),
            (h.playing = function () {
                return this._playing;
            }),
            (h.target = function () {
                return this._target;
            }),
            (h.duration = function (e) {
                return void 0 !== e && ((this._duration = e), (this._durationMs = (1e3 * e) / this._timeScale), this._playing && this._setStartTime()), this._duration;
            }),
            (h.timeScale = function (e) {
                return void 0 !== e && ((this._timeScale = e), this.duration(this._duration)), this._timeScale;
            }),
            (h.currentTime = function (e) {
                return void 0 !== e ? this.progress(e / this._duration) * this._duration : this.progress() * this._duration;
            }),
            (h.progress = function (e) {
                return (
                    void 0 !== e &&
                        ((this._progress = Math.min(1, Math.max(0, e))),
                        this._setStartTime(),
                        this._isPrepared || this._setDiff(),
                        this._playing && 1 === e
                            ? (this._completeProps(), this._onUpdate && this._onUpdate.call(this, this), this._onDraw && this._onDraw.call(this, this), this._complete())
                            : (this._updateProps(), this._onUpdate && this._onUpdate.call(this, this), this._onDraw && this._onDraw.call(this, this))),
                    this._progress
                );
            }),
            (h._resetLoop = function (e, t) {
                var i;
                for (i in t) t.hasOwnProperty(i) && null !== t[i] && ("object" == typeof t[i] ? this._resetLoop(e[i], t[i]) : (e[i] = t[i]));
            }),
            (h._cloneObjects = function () {
                var e = {},
                    t = {},
                    i = {};
                return this._cloneObjectsLoop(this._target, this._propsTo, this._propsFrom, e, t, i), { target: e, propsTo: t, propsFrom: i };
            }),
            (h._cloneObjectsLoop = function (e, t, i, s, n, r) {
                var o, a;
                for (a in i) i.hasOwnProperty(a) && void 0 === t[a] && void 0 !== e[a] && ((s[a] = e[a]), (n[a] = e[a]), (r[a] = i[a]));
                for (a in t)
                    e.hasOwnProperty(a) &&
                        ((o = typeof e[a]),
                        null !== e[a] && "object" === o
                            ? (Array.isArray(e[a]) ? ((s[a] = []), (n[a] = []), (r[a] = [])) : ((s[a] = {}), (n[a] = {}), (r[a] = {})),
                              this._cloneObjectsLoop(e[a], t[a] || {}, i[a] || {}, s[a], n[a], r[a]))
                            : null !== t[a] && "number" === o && ((s[a] = e[a]), (n[a] = t[a]), i && void 0 !== i[a] && (r[a] = i[a])));
            }),
            (h._prepareProperties = function () {
                if (!this._isPrepared) {
                    var e = this._cloneObjects();
                    (this._storeTarget = e.target),
                        (this._propsTo = e.propsTo),
                        (this._storePropsTo = this._propsTo),
                        (this._propsFrom = e.propsFrom),
                        (this._storePropsFrom = this._propsFrom),
                        (this._isPrepared = !0);
                }
            }),
            (h._setStartTime = function () {
                this._startTime = this._getTime() - this.progress() * this._durationMs;
            }),
            (h._setDiff = function () {
                this._isPrepared || this._prepareProperties(), (this._propsDiff = {}), this._setDiffLoop(this._propsTo, this._propsFrom, this._target, this._propsDiff);
            }),
            (h._setDiffLoop = function (e, t, i, s) {
                var n, r;
                for (r in e)
                    e.hasOwnProperty(r) &&
                        ((n = typeof e[r]),
                        null !== e[r] && "object" === n
                            ? ((t[r] = t[r] || {}), (s[r] = s[r] || {}), this._setDiffLoop(e[r], t[r], i[r], s[r]))
                            : "number" === n && void 0 !== i[r]
                            ? (void 0 !== t[r] ? (i[r] = t[r]) : (t[r] = i[r]), (s[r] = e[r] - i[r]))
                            : ((e[r] = null), (t[r] = null)));
            }),
            (h._start = function () {
                (this._startTimeout = null),
                    (this._remainingDelay = 0),
                    this._setStartTime(),
                    this._clock.on("update", this._update),
                    this._clock.on("draw", this._draw),
                    this._clock.isRunning() || this._clock.start(),
                    this._setDiff(),
                    (this._playing = !0),
                    (this._running = !0),
                    this._onStart && this._onStart.call(this, this),
                    this.trigger(l.PLAY, this);
            }),
            (h._stop = function () {
                (this._playing = !1), (this._running = !1), this._clock.off("update", this._update), this._clock.off("draw", this._draw);
            }),
            (h._updateProps = function () {
                var e;
                (e = 1 === this._direction ? this._ease.getValue(this._progress) : 1 - this._ease.getValue(1 - this._progress)),
                    this._updatePropsLoop(this._propsTo, this._propsFrom, this._target, this._propsDiff, e);
            }),
            (h._updatePropsLoop = function (e, t, i, s, n) {
                var r;
                for (r in e) e.hasOwnProperty(r) && null !== e[r] && ("number" != typeof e[r] ? this._updatePropsLoop(e[r], t[r], i[r], s[r], n) : (i[r] = t[r] + s[r] * n));
            }),
            (h._completeProps = function () {
                this._completePropsLoop(this._propsTo, this._target);
            }),
            (h._completePropsLoop = function (e, t) {
                var i;
                for (i in e) e.hasOwnProperty(i) && null !== e[i] && ("number" != typeof e[i] ? this._completePropsLoop(e[i], t[i]) : (t[i] = e[i]));
            }),
            (h._complete = function () {
                this._isYoyo && ((this._loop > 0 && this._loopCount <= this._loop) || (0 === this._loop && 0 === this._loopCount))
                    ? ((this._propsFrom = 1 === this._direction ? this._storePropsTo : this._storePropsFrom),
                      (this._propsTo = 1 === this._direction ? this._storePropsFrom : this._storePropsTo),
                      (this._direction *= -1),
                      -1 === this._direction && ++this._loopCount,
                      this.progress(0),
                      this._start())
                    : this._loopCount < this._loop
                    ? (++this._loopCount, this.progress(0), this._start())
                    : (this.trigger(l.COMPLETE, this), this._onComplete && this._onComplete.call(this, this), this._options && this._options.destroyOnComplete && this.destroy());
            }),
            (h._update = function (e) {
                this._running &&
                    ((this._progress = (e.timeNow - this._startTime) / this._durationMs),
                    this._progress >= 1 ? ((this._progress = 1), (this._running = !1), this._completeProps()) : this._updateProps(),
                    this._onUpdate && this._onUpdate.call(this, this));
            }),
            (h._draw = function (e) {
                this._onDraw && this._onDraw.call(this, this), this._running || (this._stop(), 1 === this._progress && this._complete());
            }),
            (l._instantiate = function () {
                return (this._clips = []), this;
            }),
            (l._add = function (e) {
                this._clips.push(e);
            }),
            (l._remove = function (e) {
                var t = this._clips.indexOf(e);
                t > -1 && this._clips.splice(t, 1);
            }),
            (l.getAll = function (e) {
                if (void 0 !== e) {
                    for (var t = [], i = this._clips.length; i--; ) this._clips[i].target() === e && t.push(this._clips[i]);
                    return t;
                }
                return Array.prototype.slice.call(this._clips);
            }),
            (l.destroyAll = function (e) {
                var t = this.getAll(e);
                this._clips.length === t.length && (this._clips = []);
                for (var i = t.length; i--; ) t[i].destroy();
                return t;
            }),
            (l.to = function (e, t, i, s) {
                return void 0 === (s = s || {}).destroyOnComplete && (s.destroyOnComplete = !0), new l(e, t, i, s).play();
            }),
            (l.from = function (e, t, i, s) {
                return ((s = s || {}).propsFrom = i), void 0 === s.destroyOnComplete && (s.destroyOnComplete = !0), new l(e, t, s.propsTo, s).play();
            }),
            (e.exports = l._instantiate());
    },
    function (e, t) {},
    function (e, t, i) {
        "use strict";
        var s = function () {};
        e.exports = function (e) {
            if (arguments.length > 1) throw new Error("Second argument not supported");
            if (null === e || "object" != typeof e) throw new TypeError("Object prototype may only be an Object.");
            return "function" == typeof Object.create ? Object.create(e) : ((s.prototype = e), new s());
        };
    },
    function (e, t) {},
    function (e, t, i) {
        "use strict";
        /*! MIT License
         *
         * KeySpline - use bezier curve for transition easing function
         * Copyright (c) 2012 Gaetan Renaudeau <renaudeau.gaetan@gmail.com>
         *
         * Permission is hereby granted, free of charge, to any person obtaining a
         * copy of this software and associated documentation files (the "Software"),
         * to deal in the Software without restriction, including without limitation
         * the rights to use, copy, modify, merge, publish, distribute, sublicense,
         * and/or sell copies of the Software, and to permit persons to whom the
         * Software is furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in
         * all copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
         * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
         * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
         * DEALINGS IN THE SOFTWARE.
         */ e.exports = function (e, t, i, s) {
            function n(e, t) {
                return 1 - 3 * t + 3 * e;
            }
            function r(e, t) {
                return 3 * t - 6 * e;
            }
            function o(e) {
                return 3 * e;
            }
            function a(e, t, i) {
                return ((n(t, i) * e + r(t, i)) * e + o(t)) * e;
            }
            function l(e, t, i) {
                return 3 * n(t, i) * e * e + 2 * r(t, i) * e + o(t);
            }
            this.get = function (n) {
                return e === t && i === s
                    ? n
                    : a(
                          (function (t) {
                              for (var s = t, n = 0; n < 4; ++n) {
                                  var r = l(s, e, i);
                                  if (0 === r) return s;
                                  s -= (a(s, e, i) - t) / r;
                              }
                              return s;
                          })(n),
                          t,
                          s
                      );
            };
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(112),
            n = i(236),
            r = i(237),
            o = i(55),
            a = 'Easing function "%TYPE%" not recognized among the following: ' + Object.keys(r).join(", ");
        e.exports = function (e) {
            var t;
            if ("step-start" === e) return s(1, "start");
            if ("step-end" === e) return s(1, "end");
            if (!(t = r[e])) throw new Error(a.replace("%TYPE%", e));
            return new o(t, n[e]);
        };
    },
    function (e, t, i) {
        "use strict";
        var s = {
            linear: "cubic-bezier(0, 0, 1, 1)",
            ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
            "ease-in": "cubic-bezier(0.42, 0, 1, 1)",
            "ease-out": "cubic-bezier(0, 0, 0.58, 1)",
            "ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)",
            "ease-in-cubic": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
            "ease-out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
            "ease-in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1)",
            "ease-in-quad": "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
            "ease-out-quad": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            "ease-in-out-quad": "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
            "ease-in-quart": "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
            "ease-out-quart": "cubic-bezier(0.165, 0.84, 0.44, 1)",
            "ease-in-out-quart": "cubic-bezier(0.77, 0, 0.175, 1)",
            "ease-in-quint": "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
            "ease-out-quint": "cubic-bezier(0.23, 1, 0.32, 1)",
            "ease-in-out-quint": "cubic-bezier(0.86, 0, 0.07, 1)",
            "ease-in-sine": "cubic-bezier(0.47, 0, 0.745, 0.715)",
            "ease-out-sine": "cubic-bezier(0.39, 0.575, 0.565, 1)",
            "ease-in-out-sine": "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
            "ease-in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
            "ease-out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
            "ease-in-out-expo": "cubic-bezier(1, 0, 0, 1)",
            "ease-in-circ": "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
            "ease-out-circ": "cubic-bezier(0.075, 0.82, 0.165, 1)",
            "ease-in-out-circ": "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
            "ease-in-back": "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
            "ease-out-back": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            "ease-in-out-back": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        };
        (s.easeIn = s["ease-in"]),
            (s.easeOut = s["ease-out"]),
            (s.easeInOut = s["ease-in-out"]),
            (s.easeInCubic = s["ease-in-cubic"]),
            (s.easeOutCubic = s["ease-out-cubic"]),
            (s.easeInOutCubic = s["ease-in-out-cubic"]),
            (s.easeInQuad = s["ease-in-quad"]),
            (s.easeOutQuad = s["ease-out-quad"]),
            (s.easeInOutQuad = s["ease-in-out-quad"]),
            (s.easeInQuart = s["ease-in-quart"]),
            (s.easeOutQuart = s["ease-out-quart"]),
            (s.easeInOutQuart = s["ease-in-out-quart"]),
            (s.easeInQuint = s["ease-in-quint"]),
            (s.easeOutQuint = s["ease-out-quint"]),
            (s.easeInOutQuint = s["ease-in-out-quint"]),
            (s.easeInSine = s["ease-in-sine"]),
            (s.easeOutSine = s["ease-out-sine"]),
            (s.easeInOutSine = s["ease-in-out-sine"]),
            (s.easeInExpo = s["ease-in-expo"]),
            (s.easeOutExpo = s["ease-out-expo"]),
            (s.easeInOutExpo = s["ease-in-out-expo"]),
            (s.easeInCirc = s["ease-in-circ"]),
            (s.easeOutCirc = s["ease-out-circ"]),
            (s.easeInOutCirc = s["ease-in-out-circ"]),
            (s.easeInBack = s["ease-in-back"]),
            (s.easeOutBack = s["ease-out-back"]),
            (s.easeInOutBack = s["ease-in-out-back"]),
            (e.exports = s);
    },
    function (e, t, i) {
        "use strict";
        var s = i(111),
            n = s(0.25, 0.1, 0.25, 1).easingFunction,
            r = s(0.42, 0, 1, 1).easingFunction,
            o = s(0, 0, 0.58, 1).easingFunction,
            a = s(0.42, 0, 0.58, 1).easingFunction,
            l = function (e, t, i, s) {
                return i * (e /= s) * e + t;
            },
            h = function (e, t, i, s) {
                return -i * (e /= s) * (e - 2) + t;
            },
            c = function (e, t, i, s) {
                return (e /= s / 2) < 1 ? (i / 2) * e * e + t : (-i / 2) * (--e * (e - 2) - 1) + t;
            },
            u = function (e, t, i, s) {
                return i * (e /= s) * e * e + t;
            },
            d = function (e, t, i, s) {
                return i * ((e = e / s - 1) * e * e + 1) + t;
            },
            m = function (e, t, i, s) {
                return (e /= s / 2) < 1 ? (i / 2) * e * e * e + t : (i / 2) * ((e -= 2) * e * e + 2) + t;
            },
            p = function (e, t, i, s) {
                return i * (e /= s) * e * e * e + t;
            },
            f = function (e, t, i, s) {
                return -i * ((e = e / s - 1) * e * e * e - 1) + t;
            },
            _ = function (e, t, i, s) {
                return (e /= s / 2) < 1 ? (i / 2) * e * e * e * e + t : (-i / 2) * ((e -= 2) * e * e * e - 2) + t;
            },
            g = function (e, t, i, s) {
                return i * (e /= s) * e * e * e * e + t;
            },
            y = function (e, t, i, s) {
                return i * ((e = e / s - 1) * e * e * e * e + 1) + t;
            },
            E = function (e, t, i, s) {
                return (e /= s / 2) < 1 ? (i / 2) * e * e * e * e * e + t : (i / 2) * ((e -= 2) * e * e * e * e + 2) + t;
            },
            b = function (e, t, i, s) {
                return -i * Math.cos((e / s) * (Math.PI / 2)) + i + t;
            },
            v = function (e, t, i, s) {
                return i * Math.sin((e / s) * (Math.PI / 2)) + t;
            },
            T = function (e, t, i, s) {
                return (-i / 2) * (Math.cos((Math.PI * e) / s) - 1) + t;
            },
            A = function (e, t, i, s) {
                return 0 === e ? t : i * Math.pow(2, 10 * (e / s - 1)) + t;
            },
            w = function (e, t, i, s) {
                return e === s ? t + i : i * (1 - Math.pow(2, (-10 * e) / s)) + t;
            },
            C = function (e, t, i, s) {
                return 0 === e ? t : e === s ? t + i : (e /= s / 2) < 1 ? (i / 2) * Math.pow(2, 10 * (e - 1)) + t : (i / 2) * (2 - Math.pow(2, -10 * --e)) + t;
            },
            O = function (e, t, i, s) {
                return -i * (Math.sqrt(1 - (e /= s) * e) - 1) + t;
            },
            S = function (e, t, i, s) {
                return i * Math.sqrt(1 - (e = e / s - 1) * e) + t;
            },
            I = function (e, t, i, s) {
                return (e /= s / 2) < 1 ? (-i / 2) * (Math.sqrt(1 - e * e) - 1) + t : (i / 2) * (Math.sqrt(1 - (e -= 2) * e) + 1) + t;
            },
            x = function (e, t, i, s) {
                var n = 1.70158,
                    r = 0,
                    o = i;
                return 0 === e
                    ? t
                    : 1 == (e /= s)
                    ? t + i
                    : (r || (r = 0.3 * s),
                      o < Math.abs(i) ? ((o = i), (n = r / 4)) : (n = (r / (2 * Math.PI)) * Math.asin(i / o)),
                      -o * Math.pow(2, 10 * (e -= 1)) * Math.sin(((e * s - n) * (2 * Math.PI)) / r) + t);
            },
            P = function (e, t, i, s) {
                var n = 1.70158,
                    r = 0,
                    o = i;
                return 0 === e
                    ? t
                    : 1 == (e /= s)
                    ? t + i
                    : (r || (r = 0.3 * s),
                      o < Math.abs(i) ? ((o = i), (n = r / 4)) : (n = (r / (2 * Math.PI)) * Math.asin(i / o)),
                      o * Math.pow(2, -10 * e) * Math.sin(((e * s - n) * (2 * Math.PI)) / r) + i + t);
            },
            D = function (e, t, i, s) {
                var n = 1.70158,
                    r = 0,
                    o = i;
                return 0 === e
                    ? t
                    : 2 == (e /= s / 2)
                    ? t + i
                    : (r || (r = s * (0.3 * 1.5)),
                      o < Math.abs(i) ? ((o = i), (n = r / 4)) : (n = (r / (2 * Math.PI)) * Math.asin(i / o)),
                      e < 1
                          ? o * Math.pow(2, 10 * (e -= 1)) * Math.sin(((e * s - n) * (2 * Math.PI)) / r) * -0.5 + t
                          : o * Math.pow(2, -10 * (e -= 1)) * Math.sin(((e * s - n) * (2 * Math.PI)) / r) * 0.5 + i + t);
            },
            M = function (e, t, i, s, n) {
                return void 0 === n && (n = 1.70158), i * (e /= s) * e * ((n + 1) * e - n) + t;
            },
            R = function (e, t, i, s, n) {
                return void 0 === n && (n = 1.70158), i * ((e = e / s - 1) * e * ((n + 1) * e + n) + 1) + t;
            },
            N = function (e, t, i, s, n) {
                return void 0 === n && (n = 1.70158), (e /= s / 2) < 1 ? (i / 2) * (e * e * ((1 + (n *= 1.525)) * e - n)) + t : (i / 2) * ((e -= 2) * e * ((1 + (n *= 1.525)) * e + n) + 2) + t;
            },
            L = function (e, t, i, s) {
                return (e /= s) < 1 / 2.75
                    ? i * (7.5625 * e * e) + t
                    : e < 2 / 2.75
                    ? i * (7.5625 * (e -= 1.5 / 2.75) * e + 0.75) + t
                    : e < 2.5 / 2.75
                    ? i * (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375) + t
                    : i * (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375) + t;
            },
            k = function (e, t, i, s) {
                return i - L(s - e, 0, i, s) + t;
            },
            F = function (e, t, i, s) {
                return e < s / 2 ? 0.5 * k(2 * e, 0, i, s) + t : 0.5 * L(2 * e - s, 0, i, s) + 0.5 * i + t;
            };
        e.exports = {
            linear: function (e, t, i, s) {
                return (i * e) / s + t;
            },
            ease: n,
            easeIn: r,
            "ease-in": r,
            easeOut: o,
            "ease-out": o,
            easeInOut: a,
            "ease-in-out": a,
            easeInCubic: u,
            "ease-in-cubic": u,
            easeOutCubic: d,
            "ease-out-cubic": d,
            easeInOutCubic: m,
            "ease-in-out-cubic": m,
            easeInQuad: l,
            "ease-in-quad": l,
            easeOutQuad: h,
            "ease-out-quad": h,
            easeInOutQuad: c,
            "ease-in-out-quad": c,
            easeInQuart: p,
            "ease-in-quart": p,
            easeOutQuart: f,
            "ease-out-quart": f,
            easeInOutQuart: _,
            "ease-in-out-quart": _,
            easeInQuint: g,
            "ease-in-quint": g,
            easeOutQuint: y,
            "ease-out-quint": y,
            easeInOutQuint: E,
            "ease-in-out-quint": E,
            easeInSine: b,
            "ease-in-sine": b,
            easeOutSine: v,
            "ease-out-sine": v,
            easeInOutSine: T,
            "ease-in-out-sine": T,
            easeInExpo: A,
            "ease-in-expo": A,
            easeOutExpo: w,
            "ease-out-expo": w,
            easeInOutExpo: C,
            "ease-in-out-expo": C,
            easeInCirc: O,
            "ease-in-circ": O,
            easeOutCirc: S,
            "ease-out-circ": S,
            easeInOutCirc: I,
            "ease-in-out-circ": I,
            easeInBack: M,
            "ease-in-back": M,
            easeOutBack: R,
            "ease-out-back": R,
            easeInOutBack: N,
            "ease-in-out-back": N,
            easeInElastic: x,
            "ease-in-elastic": x,
            easeOutElastic: P,
            "ease-out-elastic": P,
            easeInOutElastic: D,
            "ease-in-out-elastic": D,
            easeInBounce: k,
            "ease-in-bounce": k,
            easeOutBounce: L,
            "ease-out-bounce": L,
            easeInOutBounce: F,
            "ease-in-out-bounce": F,
        };
    },
    function (e, t, i) {
        "use strict";
        var s = i(113),
            n = i(240),
            r = i(115);
        (r.Clock = s), (r.ThrottledClock = n), (e.exports = r);
    },
    function (e, t) {},
    function (e, t, i) {
        "use strict";
        var s;
        i(114);
        var n = i(115),
            r = i(3).EventEmitterMicro;
        function o(e, t) {
            null !== e &&
                (r.call(this),
                (t = t || {}),
                (this._fps = e || null),
                (this._clock = t.clock || n),
                (this._lastThrottledTime = null),
                (this._clockEvent = null),
                (this._boundOnClockDraw = this._onClockDraw.bind(this)),
                (this._boundOnClockUpdate = this._onClockUpdate.bind(this)),
                this._clock.on("update", this._boundOnClockUpdate));
        }
        ((s = o.prototype = new r(null)).setFps = function (e) {
            return (this._fps = e), this;
        }),
            (s.getFps = function () {
                return this._fps;
            }),
            (s.start = function () {
                return this._clock.start(), this;
            }),
            (s.stop = function () {
                return this._clock.stop(), this;
            }),
            (s.isRunning = function () {
                return this._clock.isRunning();
            }),
            (s.destroy = function () {
                this._clock.off("update", this._boundOnClockUpdate), this._clock.destroy.call(this);
            }),
            (s._onClockUpdate = function (e) {
                null === this._lastThrottledTime && (this._lastThrottledTime = this._clock.lastFrameTime);
                var t = e.time - this._lastThrottledTime;
                if (!this._fps) throw new TypeError("FPS is not defined.");
                Math.ceil(1e3 / t) >= this._fps + 2 ||
                    ((this._clockEvent = e),
                    (this._clockEvent.delta = t),
                    (this._clockEvent.fps = 1e3 / t),
                    (this._lastThrottledTime = this._clockEvent.time),
                    this._clock.once("draw", this._boundOnClockDraw),
                    this.trigger("update", this._clockEvent));
            }),
            (s._onClockDraw = function () {
                this.trigger("draw", this._clockEvent);
            }),
            (e.exports = o);
    },
    function (e, t, i) {
        "use strict";
        e.exports = { EventEmitterMicro: i(242) };
    },
    function (e, t, i) {
        "use strict";
        function s() {
            this._events = {};
        }
        var n = s.prototype;
        (n.on = function (e, t) {
            (this._events[e] = this._events[e] || []), this._events[e].unshift(t);
        }),
            (n.once = function (e, t) {
                var i = this;
                this.on(e, function s(n) {
                    i.off(e, s), void 0 !== n ? t(n) : t();
                });
            }),
            (n.off = function (e, t) {
                if (this.has(e)) {
                    var i = this._events[e].indexOf(t);
                    -1 !== i && this._events[e].splice(i, 1);
                }
            }),
            (n.trigger = function (e, t) {
                if (this.has(e)) for (var i = this._events[e].length - 1; i >= 0; i--) void 0 !== t ? this._events[e][i](t) : this._events[e][i]();
            }),
            (n.has = function (e) {
                return e in this._events != !1 && 0 !== this._events[e].length;
            }),
            (n.destroy = function () {
                for (var e in this._events) this._events[e] = null;
                this._events = null;
            }),
            (e.exports = s);
    },
    function (e, t, i) {
        "use strict";
        var s = i(60),
            n = i(244);
        function r() {
            var e = s.getWindow(),
                t = s.getDocument(),
                i = s.getNavigator();
            return !!("ontouchstart" in e || (e.DocumentTouch && t instanceof e.DocumentTouch) || i.maxTouchPoints > 0 || i.msMaxTouchPoints > 0);
        }
        (e.exports = n(r)), (e.exports.original = r);
    },
    function (e, t, i) {
        "use strict";
        e.exports = function (e) {
            var t;
            return function () {
                return void 0 === t && (t = e.apply(this, arguments)), t;
            };
        };
    },
    function (e, t, i) {
        "use strict";
        const s = i(6),
            n = i(11),
            r = i(62),
            o = i(21).PictureLazyLoading,
            a = "enhance-xp",
            l = window.getComputedStyle(document.documentElement);
        e.exports = class extends s {
            constructor(e) {
                super(e), (this.EVT_REBASE = "xp:rebase"), (this.groupNamesToKeepAlive = []);
            }
            keepGroupNameAlive(e) {
                -1 === this.groupNamesToKeepAlive.indexOf(e) && this.groupNamesToKeepAlive.push(e);
            }
            mounted() {
                (this.rebaseComponent = this.gum.getComponentOfType("ReBase", document.body)),
                    (this._onTextZoomResize = this._onTextZoomResize.bind(this)),
                    window.addEventListener("resize:text-zoom", this._onTextZoomResize);
            }
            _reBase() {
                const e = [];
                this.anim.groups.filter((e) => !this.groupNamesToKeepAlive.includes(e.name)).forEach((t) => e.push(t.remove().catch((e) => {}))),
                    Promise.all(e)
                        .then(() => {
                            n(() => {
                                this.trigger(this.EVT_REBASE),
                                    document.documentElement.classList.remove(a),
                                    document.documentElement.classList.add("no-enhance-xp"),
                                    this.gum.components.forEach((e) => (e._isEnhanced = !1));
                                (this.gum.anim.createScrollGroup(document.body).name = "Static Images"),
                                    new o(),
                                    window.removeEventListener("resize:text-zoom", this._onTextZoomResize),
                                    this.gum.removeComponent(this.rebaseComponent);
                            });
                        })
                        .catch((e) => {});
            }
            _onTextZoomResize(e) {
                e.detail.originalSize < e.detail.currentSize && this._reBase();
            }
            onResizeDebounced() {
                r(l, "--enhanced-media-query").matches || this._reBase();
            }
            static IS_SUPPORTED() {
                return document.documentElement.classList.contains(a);
            }
        };
    },
    function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.StickyColornav = void 0);
        const s = i(6);
        class n extends s {
            constructor(e) {
                super(e),
                    (this.container = this.el.closest(".subsection-design-gallery")),
                    (this.anchors = [this.container.querySelector(".grid-item-top"), this.container]),
                    (this.start = "a0t - 100a0h"),
                    (this.end = "a1b - 100vh + 130px"),
                    (this.scrollGroup = this.gum.anim.getGroupForTarget(this.el));
            }
            mounted() {
                this.el.hasAttribute("aria-hidden") && this.el.removeAttribute("aria-hidden"),
                    this.scrollGroup.addKeyframe(this.el, { anchors: this.anchors, start: this.start, end: this.end, cssClass: "show", toggle: !0, breakpointMask: "S" });
            }
            static IS_SUPPORTED() {
                return document.documentElement.classList.contains("enhance-xp");
            }
        }
        (t.StickyColornav = n), (e.exports = n);
    },
    function (e, t, i) {
        "use strict";
        const s = i(6),
            n = "video-load-kf",
            r = { event: n, start: "a0t - 200vh", end: "a0b + 100vh" },
            o = { start: "a0t - 100vh", end: "a0b", progress: [0, 1], ease: 1 },
            a = { X: "large", L: "large", M: "medium", S: "small" };
        e.exports = class extends s {
            get viewportName() {
                return a[this.pageMetrics.breakpoint];
            }
            get videoExtension() {
                return this.isSafari ? "mp4" : "webm";
            }
            get videoURL() {
                return `${this.stripTrailingSlash(this.videoEl.dataset.videoBasepath)}/${this.viewportName}.${this.videoExtension}`;
            }
            get progress() {
                return this._progress;
            }
            get loadingState() {
                return this._loadingState;
            }
            set loadingState(e) {
                (this._loadingState = e), this._updateControllerState();
            }
            set progress(e) {
                (this._progress = e), (this.videoEl.currentTime = this.floorDecimal(this.duration * e));
            }
            floorDecimal(e) {
                return Math.floor(Number(e).toFixed(this._fractionDigits + 1) * this._powerOf10) / this._powerOf10;
            }
            stripTrailingSlash(e) {
                return e.endsWith("/") ? e.slice(0, -1) : e;
            }
            constructor(e) {
                super(e),
                    (this._progress = 0),
                    (this._loadingState = ""),
                    (this._fractionDigits = 2),
                    (this._powerOf10 = 10 ** this._fractionDigits),
                    (this.container = this.el),
                    (this.videoEl = this.el.querySelector("video")),
                    this.videoEl.setAttribute("aria-hidden", "true"),
                    (this.isSafari = document.documentElement.classList.contains("safari")),
                    this._addControllers(),
                    (this.sequenceGroup = this.anim.createScrollGroup(this.el)),
                    (this.sequenceGroup.name = `VideoScroll - ${this.videoEl.id}`),
                    (this._onDurationChange = this._onDurationChange.bind(this)),
                    (this._onErrorState = this._onErrorState.bind(this)),
                    (this._onLoadedState = this._onLoadedState.bind(this)),
                    this.videoEl.addEventListener("durationchange", this._onDurationChange),
                    this.videoEl.addEventListener("play", () => {
                        this.videoEl.pause();
                    });
            }
            mounted() {
                (this._isEnhanced = !0), this.loadKeyframe();
            }
            _addControllers() {
                (this._elementsToDecorate = []),
                    this._elementsToDecorate.push(this.container),
                    this.videoEl.id && this._elementsToDecorate.push(...Array.from(document.querySelectorAll("[data-video-scroll-controller={id}]".replace("{id}", this.videoEl.id))));
            }
            _updateControllerState() {
                for (const e of this._elementsToDecorate) e.classList.add(this.loadingState);
            }
            _requestVideoStream() {
                const e = new Request(this.videoURL),
                    t = new MediaSource();
                t.addEventListener("sourceopen", async () => {
                    const i = t.addSourceBuffer('video/webm;codecs="vp9"'),
                        s = await fetch(e);
                    if (!s.ok) return void this._onErrorState();
                    const n = s.body.getReader();
                    let r = !0;
                    for (; r; ) {
                        const { value: e, done: t } = await n.read();
                        if (t) {
                            r = !1;
                            break;
                        }
                        await new Promise((t, s) => {
                            i.appendBuffer(e),
                                (i.onupdateend = () => {
                                    t(!0);
                                });
                        });
                    }
                }),
                    (this.videoEl.src = URL.createObjectURL(t));
            }
            _onLoadedState() {
                this.loadingState = "loaded";
            }
            _onErrorState() {
                this.loadingState = "loading-error";
            }
            _requestVideo() {
                this.videoEl.addEventListener("error", this._onErrorState), (this.videoEl.src = this.videoURL);
            }
            _onDurationChange() {
                this.trigger("video-metadata-loaded"),
                    (this.videoEl.style.display = "none"),
                    requestAnimationFrame(() => {
                        this.videoEl.style.display = null;
                    }),
                    this._onLoadedState(),
                    (this.duration = this.videoEl.duration),
                    this.videoEl
                        .play()
                        .then(() => {
                            this.videoEl.pause();
                        })
                        .catch((e) => {
                            this.videoEl.pause();
                        }),
                    this.scrubKeyframe();
            }
            loadKeyframe() {
                this.loadEventKf && this.loadEventKf.remove();
                const e = Object.assign({}, r, { anchors: [this.container] }, JSON.parse(this.videoEl.getAttribute("data-video-load-kf")));
                this.loadEventKf = this.addDiscreteEvent(
                    Object.assign(e, {
                        group: this.sequenceGroup,
                        onEnterOnce: () => {
                            this.isSafari ? this._requestVideo() : this._requestVideoStream();
                        },
                    })
                );
            }
            scrubKeyframe() {
                if (this.scrubKf) return void (this.progress = this.progress);
                const e = Object.assign({}, o, { anchors: [this.container] }, JSON.parse(this.videoEl.getAttribute("data-video-progress-kf")));
                this.scrubKf = this.sequenceGroup.addKeyframe(this, e);
            }
            onBreakpointChange() {
                this._isEnhanced && this.loadKeyframe();
            }
            static IS_SUPPORTED() {
                return document.documentElement.classList.contains("enhance-xp");
            }
        };
    },
]);
