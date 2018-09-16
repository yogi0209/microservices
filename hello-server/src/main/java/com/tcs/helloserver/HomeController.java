package com.tcs.helloserver;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

	@RequestMapping(value = "/rest/hello/server", method = RequestMethod.GET)
	public String hello() {
		return "hello from server";
	}
}
