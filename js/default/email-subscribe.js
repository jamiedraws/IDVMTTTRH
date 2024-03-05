(function (global) {
	if ("app" in global) {
		const emailSubscribe = app.createContext(app);

		emailSubscribe.addProperties({
			pageCode: (function () {
				let res = "Index";
				const element = document.querySelector("#emailSubscribeJs");
				if (emailSubscribe.elementExists(element)) {
					const context = element.dataset.context;
					if (emailSubscribe.isString(context)) {
						const contextJson = JSON.parse(context);
						if (emailSubscribe.isString(contextJson.PageCode)) {
							res = contextJson.PageCode;
						}
					}
				}

				return res;
			})(),
			input: document.querySelector("#emailSubscribe"),
			submit: document.querySelector("#emailSubscribeButton"),
			pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			responseDictionary: {
				invalid: "Invalid Email Address",
				pending: "Processing...",
				error:
					"Unable to process request at this time, please try again.",
				valid: "Your email has been submitted!"
			},
			setResponse: function (data, key) {
				data.state = key;
				data.response =
					emailSubscribe.responseDictionary[key] ||
					"An error occurred.";
				emailSubscribe.notify(data);
			},
			isEmpty: function (data) {
				const res = data.value === "";
				if (res) {
					emailSubscribe.setResponse(data, "invalid");
				}
				return res;
			},
			isValid: function (data) {
				const res = emailSubscribe.pattern.test(data.value);
				if (!res) {
					emailSubscribe.setResponse(data, "invalid");
				}
				return res;
			},
			makeRequest: function (data) {
				emailSubscribe.setResponse(data, "pending");

				let req = new XMLHttpRequest();
				req.open(
					"GET",
					"/Cart/Subscribe/" +
						emailSubscribe.pageCode +
						"?email=" +
						data.value
				);
				req.dataType = "json";
				req.async = false;
				req.onload = function () {
					if (req.status === 200) {
						emailSubscribe.setResponse(data, "valid");
					} else {
						emailSubscribe.setResponse(data, "error");
					}
				};
				req.onerror = function () {
					emailSubscribe.setResponse(data, "error");
				};
				req.send();
			},
			hasElements: function () {
				return (
					emailSubscribe.elementExists(emailSubscribe.input) &&
					emailSubscribe.elementExists(emailSubscribe.submit)
				);
			},
			notify: function (data) {
				if (emailSubscribe.isFunction(data.listener)) {
					data.listener(data);
				}
			},
			processEvent: function (listener) {
				const data = {
					value: emailSubscribe.input.value,
					response: "",
					listener: listener,
					state: "default"
				};

				if (
					!emailSubscribe.isEmpty(data) &&
					emailSubscribe.isValid(data)
				) {
					emailSubscribe.makeRequest(data);
				}
			},
			init: function (listener) {
				if (emailSubscribe.hasElements()) {
					emailSubscribe.submit.addEventListener(
						"click",
						emailSubscribe.processEvent.bind(
							emailSubscribe,
							listener
						)
					);
				}
			}
		});

		emailSubscribe.init(function (data) {
			console.log(data);
			makeToast("form-response", data.response, data.state);
		});
	}
})(window);
