/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gbc.gateway.main;

import com.gbc.gateway.common.AppConst;
import com.gbc.gateway.common.Config;
import com.gbc.gateway.controller.DashboardController;
import com.gbc.gateway.controller.InvoiceController;
import com.gbc.gateway.controller.LoginController;
import com.gbc.gateway.controller.ReportController;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import org.apache.log4j.Logger;
import org.eclipse.jetty.server.Connector;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.DefaultHandler;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;


/**
 *
 * @author diepth
 */
public class WebServer implements Runnable{
    
    private static final Logger logger = Logger.getLogger(WebServer.class);
    private Server server = new Server();
    private static WebServer _instance = null;
    private static final Lock createLock_ = new ReentrantLock();
    
    public static WebServer getInstance() {
        if (_instance == null) {
            createLock_.lock();
            try {
                if (_instance == null) {
                    _instance = new WebServer();
                }
            } finally {
                createLock_.unlock();
            }
        }
        return _instance;
    }
    
    @Override
    public void run() {
        try {
            int http_port = Integer.valueOf(Config.getParam("server", "http_port"));
            
            ServerConnector connector = new ServerConnector(server);
            connector.setPort(http_port);
            connector.setIdleTimeout(30000);
            
            server.setConnectors(new Connector[]{connector});
            logger.info("Start server...");
            
            ServletContextHandler servletContext = new ServletContextHandler(ServletContextHandler.NO_SESSIONS);
            servletContext.setContextPath("/");
                      
            servletContext.addServlet(InvoiceController.class, "/v001/zp/be/invoice/*");
            servletContext.addServlet(DashboardController.class, "/v001/zp/be/dashboard/*");
            servletContext.addServlet(LoginController.class, "/v001/zp/be/login/*");
            servletContext.addServlet(ReportController.class, "/v001/zp/be/report/*");

            ResourceHandler resource_handler = new ResourceHandler();
            resource_handler.setResourceBase("./static/");
            ContextHandler resourceContext = new ContextHandler();
            resourceContext.setContextPath("/static");
            resourceContext.setHandler(resource_handler);
            
            //get param [gg_mail]
            AppConst.GMAIL_HOST = Config.getParam("gg_mail", "host");
            AppConst.GMAIL_PORT = Config.getParam("gg_mail", "port");
            AppConst.GMAIL_USER = Config.getParam("gg_mail", "username");
            AppConst.GMAIL_PWD = Config.getParam("gg_mail", "password");
            
            HandlerList handlers = new HandlerList();
            handlers.setHandlers(new Handler[]{resourceContext, servletContext, new DefaultHandler()});
            server.setHandler(handlers);
            
            server.start();
            server.join();
        } catch (Exception e) {
            logger.error("Cannot start web server: " + e.getMessage());
            System.exit(1);
        }
    }
    
    public void stop() throws Exception {
        server.stop();
    }
}
