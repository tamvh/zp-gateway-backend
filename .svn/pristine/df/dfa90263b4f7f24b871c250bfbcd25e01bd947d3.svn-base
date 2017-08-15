/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gbc.gateway.model;

import com.gbc.gateway.common.AppConst;
import com.gbc.gateway.common.CommonFunction;
import com.gbc.gateway.common.CommonModel;
import com.gbc.gateway.common.Config;
import com.gbc.gateway.common.GoogleEmail;
import com.gbc.gateway.common.RenderModel;
import com.gbc.gateway.data.Account;
import com.gbc.gateway.data.Merchant;
import com.gbc.gateway.database.MySqlFactory;
import com.gbc.gateway.hmacutil.HMACUtil;
import static com.gbc.gateway.hmacutil.HMACUtil.HMacHexStringEncode;
import com.google.gson.JsonObject;
import hapax.Template;
import hapax.TemplateDataDictionary;
import hapax.TemplateDictionary;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.logging.Level;
import org.apache.log4j.Logger;
/**
 *
 * @author tamvh
 */
public class AccountModel {
    private static AccountModel _instance = null;
    private static final Lock createLock_ = new ReentrantLock();
    protected final Logger logger = Logger.getLogger(this.getClass());
    
    public static AccountModel getInstance() throws IOException {
        if (_instance == null) {
            createLock_.lock();
            try {
                if (_instance == null) {
                    _instance = new AccountModel();
                }
            } finally {
                createLock_.unlock();
            }
        }
        return _instance;
    }
    
    public int verifyAccount(String accountName, StringBuilder app_id, StringBuilder app_user) {        
        Connection connection = null;
        Statement stmt = null;
        ResultSet rs = null;
        String table_name = "account";
        int ret = -1;
        
        try {            
            connection = MySqlFactory.getConnection();
            stmt = connection.createStatement();
            
            String queryStr;
        
            queryStr = String.format("SELECT `app_id` FROM %s  WHERE `account_name` = '%s'", table_name, accountName);
            stmt.execute(queryStr);
            rs = stmt.getResultSet();
           
            if (rs != null) {
                if (rs.next()) {
                    app_id.append(rs.getString("app_id"));
                    ret = 0;
                }
            }
            
            table_name = "merchants";
            queryStr = String.format("SELECT `app_user` FROM %s  WHERE `app_id` = '%s'", table_name, app_id);
            stmt.execute(queryStr);
            rs = stmt.getResultSet();
           
            if (rs != null) {
                if (rs.next()) {
                    app_user.append(rs.getString("app_user"));
                    ret = 0;
                }
            }
            
        } catch (Exception ex) {
            logger.error(getClass().getSimpleName() + ".getValue: " + ex.getMessage(), ex);
        } finally {
            MySqlFactory.safeClose(rs);
            MySqlFactory.safeClose(stmt);
            MySqlFactory.safeClose(connection);
        }
        
        return ret;
    }
    
    // for accountant page
    public int verifyLoginAccountant(String accountName) {
        Connection connection = null;
        Statement stmt = null;
        ResultSet rs = null;
        int ret = -1;
        
        try {            
            connection = MySqlFactory.getConnection();
            stmt = connection.createStatement();
            
            String queryStr;
        
            queryStr = String.format("SELECT COUNT(`account_name`) AS s1 FROM `account` WHERE `account_name` = '%1$s'",  accountName);

            stmt.execute(queryStr);
            rs = stmt.getResultSet();
           
            if (rs != null) {
                if (rs.next()) {
                    if (rs.getInt("s1") != 1) {
                        ret = 1;
                    } else {                        
                        ret = 0;
                    }
                } else {
                   ret = 2;
                }
            }            
        } catch (Exception ex) {
            logger.error(getClass().getSimpleName() + ".verifyLoginAccountant: " + ex.getMessage(), ex);
        } finally {
            MySqlFactory.safeClose(rs);
            MySqlFactory.safeClose(stmt);
            MySqlFactory.safeClose(connection);
        }
        
        return ret;
    }
    
    public int checkLogin(String username, String password, JsonObject account){
        
        int ret = -1;
        Connection connection = null;
        Statement stmt = null;
        ResultSet rs = null;
        
        try {
            String queryStr;
            String accountTableName = "account";
            String app_id = "";
        
            connection = MySqlFactory.getConnection();
            stmt = connection.createStatement();
            
            queryStr =String.format("SELECT `account_id`, `account_name`, `app_id`, `reset` FROM %1$s"
                    + " WHERE `account_name` = '%2$s' AND `password` = PASSWORD('%3$s') AND status = 1", 
                    accountTableName,  username, password);
            System.out.println("Query login: " + queryStr);
            stmt.execute(queryStr);
            rs = stmt.getResultSet();
            if (rs != null) {
                if (rs.next()) {
                    app_id = rs.getString("app_id");
                    account.addProperty("account_id", rs.getInt("account_id"));
                    account.addProperty("account_name", rs.getString("account_name"));
                    account.addProperty("app_id", app_id);
                    account.addProperty("reset", rs.getInt("reset"));
                    ret = 0;
                } else {
                    ret = 2;
                }                
            }
            
            if(ret == 0) {
                accountTableName = "merchants";
                queryStr = String.format("SELECT `app_user` FROM %1$s  WHERE `app_id` = '%2$s'", accountTableName, app_id);
                stmt.execute(queryStr);
                rs = stmt.getResultSet();
                if (rs != null) {
                    if (rs.next()) {
                        account.addProperty("app_user", rs.getString("app_user"));
                    }
                }
            }
        } catch (SQLException ex) {
            java.util.logging.Logger.getLogger(AccountModel.class.getName()).log(Level.SEVERE, null, ex);
            ret = -1;
        } finally {
            MySqlFactory.safeClose(rs);
            MySqlFactory.safeClose(stmt);
            MySqlFactory.safeClose(connection);
        }
        return ret;
    }
    
    public int changePassword(String username, String old_password, String new_password) {
        int ret = -1;
        Connection connection = null;
        Statement stmt = null;
        ResultSet rs = null;
        try {
            String queryStr;
            String accountTableName = "account";
        
            connection = MySqlFactory.getConnection();
            stmt = connection.createStatement();
            
            queryStr =String.format("SELECT `account_id` FROM %1$s"
                    + " WHERE `account_name` = '%2$s' AND `password` = PASSWORD('%3$s') AND status = 1", 
                    accountTableName,  username, old_password);
            System.out.println("Query get account information: " + queryStr);
            stmt.execute(queryStr);
            rs = stmt.getResultSet();
            
            if (rs != null) {
                if(rs.last()) {
                    if (rs.getRow()> 0) {
                        ret = 0;
                    } else {
                        ret = 1;
                    }  
                } else {
                    ret = 1;
                }            
            }
            else {
                ret = 1;
            }
            
            if(ret == 0) {
                queryStr = String.format("UPDATE `account` SET `password`= PASSWORD('%s'), `reset` = 0 WHERE `account_name` = '%s'", new_password, username);
                if(stmt.executeUpdate(queryStr) > 0) {                    
                    ret = 0;                                                  
                }
            }
            
            
        } catch (SQLException ex) {
            java.util.logging.Logger.getLogger(AccountModel.class.getName()).log(Level.SEVERE, null, ex);
            ret = -1;
        } finally {
            MySqlFactory.safeClose(rs);
            MySqlFactory.safeClose(stmt);
            MySqlFactory.safeClose(connection);
        }
        return ret;
    }
    
    public int resetPassword(String username, String password) {
        int ret = -1;
        Connection connection = null;
        Statement stmt = null;
        ResultSet rs = null;
        try {
            String queryStr;        
            connection = MySqlFactory.getConnection();
            stmt = connection.createStatement();
            queryStr = String.format("UPDATE `account` SET `password`= PASSWORD('%s') WHERE `account_name` = '%s'", password, username);
            if(stmt.executeUpdate(queryStr) > 0) {                    
                ret = 0;                                                  
            }
        } catch (SQLException ex) {
            java.util.logging.Logger.getLogger(AccountModel.class.getName()).log(Level.SEVERE, null, ex);
            ret = -1;
        } finally {
            MySqlFactory.safeClose(rs);
            MySqlFactory.safeClose(stmt);
            MySqlFactory.safeClose(connection);
        }
        return ret;
    }
    
    public int forgetPassword(String email) throws Exception {
        int ret = -1;
        Connection connection = null;
        Statement stmt = null;
        ResultSet rs = null;
        try {
            String queryStr;
            String accountTableName = "account";
        
            connection = MySqlFactory.getConnection();
            stmt = connection.createStatement();
            
            queryStr =String.format("SELECT `account_id` FROM %1$s"
                    + " WHERE `account_name` = '%2$s' AND status = 1", 
                    accountTableName,  email);
            System.out.println("Query get account information: " + queryStr);
            stmt.execute(queryStr);
            rs = stmt.getResultSet();
            
            if (rs != null) {
                if(rs.last()) {
                    if (rs.getRow()> 0) {
                        ret = sendMail(email);
                    }  
                }           
            }            
            
        } catch (SQLException ex) {
            java.util.logging.Logger.getLogger(AccountModel.class.getName()).log(Level.SEVERE, null, ex);
            ret = -1;
        } finally {
            MySqlFactory.safeClose(rs);
            MySqlFactory.safeClose(stmt);
            MySqlFactory.safeClose(connection);
        }
        return ret;
    }
    
    public int sendMail(String email) throws Exception {
        int ret = AppConst.ERROR_GENERIC;
        String listEmailReceive = email;
        String listEmailCC = "";
        String subj = "Quên mật khẩu";
        String content = renderContent(email);
        ret = GoogleEmail.sendEmail(listEmailReceive, listEmailCC, subj, content);                
        return ret;
    }
    
    private String renderContent(String email) throws Exception {
        String content = "";        
        String hmacemail = CommonFunction.encode(email);
        String param = "email=" + hmacemail;
        TemplateDataDictionary dic = TemplateDictionary.create();
        try {
            dic.setVariable("EMAIL", email);
            dic.setVariable("URL", Config.getParam("url", "url"));
            dic.setVariable("URL_ACTIVE", Config.getParam("url", "url_active") + "/#/resetpassword?" + param);
            Template template = RenderModel.getCTemplate("email");
            content = template.renderToString(dic);
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(AccountModel.class.getName()).log(Level.SEVERE, null, ex);            
        }
        return content;
    }
}
