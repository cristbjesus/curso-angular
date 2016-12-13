package br.org.senai.servlet;

import java.io.IOException;
import java.util.Base64;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/authc")
public class LoginServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession httpSession = request.getSession(false);

		if (httpSession != null) {
			httpSession.invalidate();
		}

		request.getSession(true);

		boolean loginSuccess = true;

		if (isBasicAuthentication(request)) {
			String[] usernameAndPassword = extractUsernameAndPassword(getAuthorizationHeader(request));

			String username = usernameAndPassword[0];
			String password = usernameAndPassword[1];

			if (username.equals("teste1") && password.equals("teste2")) {
				request.getSession().setAttribute("loggedUser", username);
			} else {
				loginSuccess = false;
				request.getSession().setAttribute("loggedUser", null);
			}
		} else {
			loginSuccess = false;
		}

		if (loginSuccess) {
			response.setStatus(HttpServletResponse.SC_OK);
		} else {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

	/**
	 * 
	 * @param request
	 * @return
	 */
	private boolean isBasicAuthentication(HttpServletRequest request) {
		return getAuthorizationHeader(request) != null && getAuthorizationHeader(request).startsWith("Basic ");
	}

	/**
	 * 
	 * @param request
	 * @return
	 */
	private String getAuthorizationHeader(HttpServletRequest request) {
		return request.getHeader("Authorization");
	}

	/**
	 * 
	 * @param authorizationHeader
	 * @return
	 */
	private String[] extractUsernameAndPassword(String authorizationHeader) {
		String base64Token = authorizationHeader.substring(6);
		String token = new String(Base64.getDecoder().decode(base64Token));

		String username = "";
		String password = "";

		int delim = token.indexOf(":");

		if (delim != -1) {
			username = token.substring(0, delim);
			password = token.substring(delim + 1);
		}

		return new String[] { username, password };
	}
}
