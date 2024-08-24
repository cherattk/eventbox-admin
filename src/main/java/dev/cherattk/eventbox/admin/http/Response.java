package dev.cherattk.eventbox.admin.http;

public class Response {
	
	public static String success() {
		return "{\"response\":\"success\"}";
	}
	
	public static String fail() {
		return "{\"response\":\"fail\"}";
	}
	
	public static String error() {
		return "{\"response\":\"error\"}";
	}

}
