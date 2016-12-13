package br.org.senai.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//@WebFilter("/*")
public class AuthenticationFilter implements Filter {

	private final static String LOGGED_USER = "loggedUser";

	@Override
	public void destroy() {

	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;

		String loggedUser = (String) httpRequest.getSession().getAttribute(LOGGED_USER);

		String requestURI = httpRequest.getRequestURI();
		String contextPath = httpRequest.getContextPath() + "/";

		if (loggedUser == null && !requestURI.endsWith("authc") && !requestURI.endsWith("index2.html")) {
			String loginPage = contextPath + "index2.html";
			httpResponse.sendRedirect(loginPage);
		} else {
			chain.doFilter(request, response);
		}
	}
}
