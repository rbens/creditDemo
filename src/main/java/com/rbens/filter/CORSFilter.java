package com.rbens.filter;
import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

@Component
public class CORSFilter implements Filter {

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        HttpServletRequest request = (HttpServletRequest) req;

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:8090");
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:9001");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
        if(request.getMethod().equalsIgnoreCase("OPTIONS")){
            response.addHeader("Access-Control-Allow-Headers",request.getHeader("Access-Control-Request-Headers"));
            response.setHeader("Content-Length", "0");
            response.setHeader("Content-Type", "text/plain charset=UTF-8");
        } else {
            response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
        }
        chain.doFilter(req, res);
    }

    public void init(FilterConfig filterConfig) {}

    public void destroy() {}

}