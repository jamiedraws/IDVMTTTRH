(function (global) {
    if ("app" in global) {
        const promoLibrary = app.createContext(app);

        const shippingHandler = app.createContext(app);

        shippingHandler.addProperties({

            getShipFields: function () {
                return document.getElementsByClassName("shipping__field");
            },
            getShipFieldToggle: function () {
                return document.getElementById("ShippingIsDifferentThanBilling");
            },
            toggleDisabled: function () {
                let shipToggle = this.getShipFieldToggle();
                let shipFields = this.getShipFields();
                if (this.elementExists(shipToggle) && !shipToggle.checked) {
                    for (var i = 0; i < shipFields.length; i++) {
                        shipFields[i].setAttribute("disabled", "disabled");
                    }
                } else {
                    for (var i = 0; i < shipFields.length; i++) {
                        shipFields[i].removeAttribute("disabled");
                    }
                }
            }
        });


        promoLibrary.addProperties({
            submit: document.querySelector(".ddlPromoButton"),
            input: document.querySelector(".ddlPromo"),
            registerListener: function (func) {
                return this.isFunction(func) ? func : function () {};
            },
            responseDictionary: {
                valid: "Promo code <strong>{0}</strong> has been applied.",
                invalid: "Promo code <strong>{0}</strong> is not available.",
                empty: "Please provide a promo code."
            },
            setResponse: function (response, key) {
                response.state = key;
                if (response.errors && response.errors.length > 0) {
                    response.message = response.errors[0];
                } else {
                    response.message =
                        promoLibrary.responseDictionary[key] ||
                        "An error occurred.";
                    response.message = response.message.replace(
                        "{0}",
                        response.promoCode
                    );
                }
               

                response.listener(response);
            },
            validatePromoCode: function (response) {
                const hasTarget = this.isString(response.promoCodeTarget);

                if (
                    hasTarget &&
                    response.promoCodeTarget === response.promoCode.toUpperCase()
                ) {
                    promoLibrary.setResponse(response, "valid");
                } else {
                    promoLibrary.setResponse(response, "invalid");
                    document.getElementById("promoCode").value = "";
                }
            },
            hasPromoCode: function (response) {
                const hasPromoCode = this.isString(response.promoCode);

                if (!hasPromoCode) {
                    promoLibrary.setResponse(response, "empty");
                }

                return hasPromoCode;
            },
            processEvent: function (data, func) {
                const response = {
                    promoCode: data.promoCode,
                    promoCodeTarget: data.promoCodeTarget,
                    errors: data.errors,
                    message: "",
                    listener: promoLibrary.registerListener(func),
                    state: "default"
                };

                if (promoLibrary.hasPromoCode(response)) {
                    promoLibrary.validatePromoCode(response);
                }
            },
            init: function () {
                let state = false;
                const submit = promoLibrary.submit;

                const setState = function () {
                    if (!state) {
                        state = true;
                    }
                };

                if (promoLibrary.elementExists(submit)) {
                    submit.addEventListener("click", setState);
                }

                registerEvent("CartChange", function (event) {
                    if (state) {
                        promoLibrary.processEvent(
                            event.detail,
                            function (response) {
                                makeToast(
                                    "form-response",
                                    response.message,
                                    response.state
                                );
                                state = false;
                            }
                        );
                    }
                });
            }
        });

        promoLibrary.init();

        document.addEventListener("DOMContentLoaded", function () {
            shippingHandler.listen(
                shippingHandler.getShipFieldToggle(),
                shippingHandler.toggleDisabled.bind(shippingHandler),
                "change"
            );
        });

    }
})(window);
