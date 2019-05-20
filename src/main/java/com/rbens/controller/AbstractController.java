package com.rbens.controller;

import java.io.*;
import java.net.HttpURLConnection;

import static java.nio.charset.StandardCharsets.UTF_8;


public abstract class AbstractController {

    String getResponseAsString(HttpURLConnection con) throws IOException {
        final BufferedInputStream bis = new BufferedInputStream(con.getInputStream());
        final ByteArrayOutputStream buf = new ByteArrayOutputStream();
        int result2 = bis.read();
        while(result2 != -1) {
            buf.write((byte) result2);
            result2 = bis.read();
        }
        return buf.toString();
    }

    void addParamsToRequestBody(HttpURLConnection con, String requestBody, String ... params) throws IOException {
        final OutputStream outputStream = con.getOutputStream();
        final OutputStreamWriter outputStreamWriter = new OutputStreamWriter(outputStream, UTF_8);
        outputStreamWriter.write(String.format(requestBody, params));
        outputStreamWriter.flush();
        outputStreamWriter.close();
        outputStream.close();
    }

}
