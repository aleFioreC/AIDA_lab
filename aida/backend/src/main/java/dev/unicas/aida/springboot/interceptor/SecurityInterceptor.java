package dev.unicas.aida.springboot.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.ModelAndView;

import dev.unicas.aida.springboot.service.AuthService;
import dev.unicas.aida.springboot.service.UserService;

@Component
public class SecurityInterceptor implements HandlerInterceptor {

	private final Logger log = LogManager.getLogger(getClass());

	private static final String AUTH_HEADER_PARAMETER_AUTHERIZATION = "authorization";

	private String username = "admin";

	@Autowired
	private AuthService authService;

	@Autowired
	private UserService userService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		Boolean isValidBasicAuthRequest = false;

		log.info("[Inside PRE Handle interceptor][" + request + "]" + "[" + request.getMethod() + "]"
				+ request.getRequestURI());

		try {
			
		     String path = (String) request.
                     getAttribute(HandlerMapping.
                       BEST_MATCHING_PATTERN_ATTRIBUTE);
		     
		    String paths[]=path.split("/");
		    
		    // caso path "/aida"
		    if (paths.length <= 2) {
				return true;
		    }
		    
			// Grab basic header value from request header object.
			String basicAuthHeaderValue = request.getHeader(AUTH_HEADER_PARAMETER_AUTHERIZATION);
			
			String psw = this.userService.getEncodedPsw(username);

			// Process basic authentication
			isValidBasicAuthRequest = authService.validateBasicAuthentication(username, psw, basicAuthHeaderValue);

			// If this is invalid request, then set the status as UNAUTHORIZED.
			if (!isValidBasicAuthRequest) {
				response.setStatus(HttpStatus.UNAUTHORIZED.value());
			}

		} catch (Exception e) {
			log.error("Error occured while authenticating request : " + e.getMessage());
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
		}

		return isValidBasicAuthRequest;

	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {

		log.info("[Inside POST Handle Interceptor]" + request.getRequestURI());

	}

}
