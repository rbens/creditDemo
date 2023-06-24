package com.rbens.config;

import com.rbens.filter.CORSFilter;
import jakarta.servlet.Filter;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletRegistration;

@Configuration
public class RestWebAppInitializer implements WebApplicationInitializer {

    @Override
    public void onStartup(jakarta.servlet.ServletContext servletContext) {
        AnnotationConfigWebApplicationContext rootCtx = new AnnotationConfigWebApplicationContext();

        servletContext.addListener(new ContextLoaderListener(rootCtx).toString());
        servletContext.addFilter("corsFilter", (Filter) new CORSFilter()).addMappingForUrlPatterns(null, false, "/*");

        AnnotationConfigWebApplicationContext webCtx = new AnnotationConfigWebApplicationContext();
        webCtx.register(SpringMVCConfig.class);

        ServletRegistration.Dynamic reg = (ServletRegistration.Dynamic) servletContext.addServlet("rest", new DispatcherServlet(webCtx));
        reg.setLoadOnStartup(1);
        reg.addMapping("/");
    }

}