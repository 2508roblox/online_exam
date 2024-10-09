(() => {
    function n(n, e, t) {
        return (
            e in n
                ? Object.defineProperty(n, e, {
                      value: t,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                  })
                : (n[e] = t),
            n
        );
    }
    function e(n) {
        return '\n        <span class="'.concat(
            1 == n ? "checkmark" : "crossmark",
            '"></span>\n    '
        );
    }
    function t(n) {
        $("#previous-question, #next-question").attr("disabled", !1),
            1 == n && $("#previous-question").attr("disabled", !0);
    }
    function i(n) {
        $(".number-question").removeClass("active"),
            $("[number-question=".concat(n, "]")).addClass("active"),
            (window.location.hash = "cau_" + parseInt(n)),
            $(".quiz-content").addClass("d-none"),
            $("[quiz-index=".concat(n, "]")).removeClass("d-none"),
            $("#previous-question, #next-question").removeClass("d-none"),
            $("#submit-question").addClass("d-none");
    }
    function o() {
        var n = parseInt(document.location.hash.split("#cau_")[1]);
        return n && Number.isInteger(n) ? Math.abs(n) : 1;
    }
    function a() {
        var e,
            t =
                arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : "",
            i = "";
        $('.number-question:not(".correct, .failed")').each(function () {
            i += $(this).text() + ", ";
        });
        var o =
            "" == i
                ? "Bạn đã sẵn sàng nộp bài!"
                : "Bạn chưa hoàn thành các câu: " + i.slice(0, -2);
        Swal.fire(
            ((e = { icon: "question", title: "Nộp bài?", text: o }),
            n(e, "icon", "warning"),
            n(e, "showCancelButton", !0),
            n(e, "confirmButtonColor", "#3085d6"),
            n(e, "cancelButtonColor", "#d33"),
            n(e, "confirmButtonText", "Nộp bài"),
            n(e, "cancelButtonText", "Tiếp tục"),
            e)
        ).then(function (n) {
            n.isConfirmed &&
                axios({
                    method: "POST",
                    url: $("#submit-test").data("action"),
                    data: {},
                })
                    .then(function (n) {
                        "" == t && (t = n.data.redirectTo),
                            t
                                ? (window.location.href = t)
                                : window.location.reload();
                    })
                    .catch(function (n) {
                        Swal.fire({
                            icon: "error",
                            title: "Error...",
                            text: "Đã xảy ra sự cố, vui lòng thử lại hoặc tải lại trang!",
                        });
                    });
        });
    }
    $(function () {
        var n;
        $("#sidebarCollapse").on("click", function () {
            $("#sidebar-wrapper, #content, .navbar-fixed").toggleClass(
                "active"
            ),
                $(".collapse.in").toggleClass("in"),
                $("a[aria-expanded=true]").attr("aria-expanded", "false");
        }),
            (n = new Date().getTime()),
            setInterval(function () {
                var e = new Date().getTime() - n,
                    t = Math.floor((e % 864e5) / 36e5),
                    i = Math.floor((e % 36e5) / 6e4),
                    o = Math.floor((e % 6e4) / 1e3);
                document.getElementById("timer").innerHTML =
                    (t < 10 ? "0" + t : t) +
                    ":" +
                    (i < 10 ? "0" + i : i) +
                    ":" +
                    (o < 10 ? "0" + o : o);
            }, 1e3);
        var s = o(),
            c = $(".number-question").length;
        i(s),
            $(window).on("hashchange", function () {
                var n = o();
                i((s = n > c ? c : n));
            });
        var r = document.querySelector(".scroll-on"),
            l = document.querySelectorAll(".scroll-overlay"),
            u = Array.from(l).find(function (n) {
                return (
                    n.nextElementSibling &&
                    "scroll-overlay" === n.nextElementSibling.className
                );
            }),
            d = Array.from(l).find(function (n) {
                return (
                    n.previousElementSibling &&
                    "scroll-overlay" === n.previousElementSibling.className
                );
            }),
            f = document.querySelector(".scroll-slider ul"),
            h = document.querySelectorAll(".scroll-slider li"),
            m = function (n) {
                var e = n.target;
                e.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                }),
                    e.classList.contains("active") ||
                        (h.forEach(function (n) {
                            n.classList.remove("active");
                        }),
                        e.classList.add("active"),
                        (window.location.hash =
                            "cau_" +
                            parseInt(e.getAttribute("number-question"))));
            };
        h.forEach(function (n) {
            n.addEventListener("click", m);
        });
        var v,
            b,
            p,
            q,
            g = function (n) {
                u.style.opacity = n ? 1 : 0;
            },
            w = function (n) {
                d.style.opacity = n ? 1 : 0;
            },
            x = function () {
                0 === r.scrollLeft ? g(!1) : g(!0),
                    r.scrollLeft === f.scrollWidth - r.clientWidth
                        ? w(!1)
                        : w(!0);
            };
        x(),
            r.addEventListener(
                "scroll",
                ((v = x),
                (b = 50),
                function () {
                    var n = this,
                        e = arguments,
                        t = function () {
                            (q = null), p || v.apply(n, e);
                        },
                        i = p && !q;
                    clearTimeout(q), (q = setTimeout(t, b)), i && v.apply(n, e);
                })
            ),
            $("#next-question").click(function () {
                ++s > c && ((s = c), a()),
                    t(s),
                    i(s),
                    $(
                        ".number-question[number-question='".concat(s, "']")
                    ).trigger("click");
            }),
            $("#previous-question").click(function () {
                --s < 1 && (s = 1),
                    t(s),
                    i(s),
                    $(
                        ".number-question[number-question='".concat(s, "']")
                    ).trigger("click");
            }),
            $('.quiz:not(".done") .anwser').on("click", function () {
                $("#previous-question, #next-question").addClass("d-none"),
                    $("#submit-question").removeClass("d-none");
            }),
            $("#submit-question").on("click", function () {
                var n = $(".quiz[quiz-index=".concat(s, "]")),
                    t = n.attr("quiz-id"),
                    i = $(".anwser:checked").val() || null;
                n
                    .find(".options")
                    .append('<div class="overlay-anwsers"></div>'),
                    axios({
                        method: "POST",
                        url: $(this).data("action"),
                        data: { question_id: t, choose_answer_index: i },
                    })
                        .then(function (t) {
                            var i, o;
                            200 == t.status &&
                                ($(
                                    ".js-reason-".concat(t.data.question.id)
                                ).html(
                                    ((i = t.data.question.reason),
                                    (o = t.data.status),
                                    '\n        <p class="reason-label">Giải Thích</p>\n        <div class="p-l-20 m-t-15 '
                                        .concat(
                                            1 == o ? "bl-green" : "bl-red",
                                            '">\n            '
                                        )
                                        .concat(i, "\n        </div>\n    "))
                                ),
                                $(".anwser:checked")
                                    .siblings("label")
                                    .append(e(t.data.status))
                                    .css(
                                        "background",
                                        1 == t.data.status
                                            ? "#effbee"
                                            : "#f9dbdb"
                                    ),
                                n
                                    .find(
                                        ".anwser[value='".concat(
                                            t.data.right_answer,
                                            "']"
                                        )
                                    )
                                    .siblings("label")
                                    .append(e(1)),
                                n.addClass("done"),
                                n.find(".options .anwser").remove(),
                                $(
                                    ".number-question[question-id=".concat(
                                        t.data.question.id,
                                        "]"
                                    )
                                ).addClass(
                                    1 == t.data.status ? "correct" : "failed"
                                ),
                                (toastr.options.timeOut = 1e3),
                                1 == t.data.status ||
                                    toastr.error(
                                        "Tiếc quá! Bạn đã chọn sai đáp án."
                                    ),
                                $(
                                    ".js-reason-".concat(t.data.question.id)
                                )[0].scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                }),
                                MathJax.Hub.Queue(["Typeset", MathJax.Hub]));
                        })
                        .catch(function (n) {
                            Swal.fire({
                                icon: "error",
                                title: "Error...",
                                text: "Đã xảy ra sự cố, vui lòng thử lại hoặc tải lại trang!",
                            });
                        })
                        .finally(function () {
                            $("#previous-question, #next-question").removeClass(
                                "d-none"
                            ),
                                $("#submit-question").addClass("d-none");
                        });
            }),
            $(".show-anwser").on("click", function () {
                $(".anwser").prop("checked", !1),
                    $("#submit-question").trigger("click");
            }),
            $("#submit-test").on("click", function () {
                a();
            }),
            $(".leave-site").on("click", function (n) {
                n.preventDefault(), a($(this).attr("href"));
            });
    });
})();
