package com.rbens.config;

import com.rbens.filter.CORSFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

@Configuration
public class RestWebAppInitializer implements WebApplicationInitializer {

    public void onStartup(ServletContext servletContext) throws ServletException {
        AnnotationConfigWebApplicationContext rootCtx = new AnnotationConfigWebApplicationContext();

        servletContext.addListener(new ContextLoaderListener(rootCtx));
        servletContext.addFilter("corsFilter", new CORSFilter()).addMappingForUrlPatterns(null, false, "/*");

        AnnotationConfigWebApplicationContext webCtx = new AnnotationConfigWebApplicationContext();
        webCtx.register(SpringMVCConfig.class);

        ServletRegistration.Dynamic reg = servletContext.addServlet("rest", new DispatcherServlet(webCtx));
        reg.setLoadOnStartup(1);
        reg.addMapping("/");
    }

}