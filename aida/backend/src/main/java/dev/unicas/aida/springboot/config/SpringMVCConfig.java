package dev.unicas.aida.springboot.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import dev.unicas.aida.springboot.interceptor.SecurityInterceptor;

/**
 * @author chanaka.k
 *
 */
@Configuration
public class SpringMVCConfig implements WebMvcConfigurer {

	@Autowired
	SecurityInterceptor securityInterceptor;

	/**
	 * Add Spring MVC lifecycle interceptors for pre- and post-processing of
	 * controller method invocations and resource handler requests.
	 * Interceptors can be registered to apply to all requests or be limited
	 * to a subset of URL patterns.
	 */
	@Override
	public void addInterceptors(final InterceptorRegistry registry) {
		registry.addInterceptor(securityInterceptor);
	}

}
