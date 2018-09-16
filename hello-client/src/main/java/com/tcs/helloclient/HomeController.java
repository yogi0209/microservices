package com.tcs.helloclient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class HomeController {

	@Autowired
	RestTemplate restTemplate;

	@RequestMapping(value = "/rest/hello/client", method = RequestMethod.GET)
	public String hello() {

		String url = "http://HELLO-SERVER/hello-server/rest/hello/server";
		return restTemplate.getForObject(url, String.class);

		// return "hello from client";
	}
}
