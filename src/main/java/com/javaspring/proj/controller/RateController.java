package com.javaspring.proj.controller;

import com.javaspring.proj.Repos.RateRepository;
import com.javaspring.proj.model.Rate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.Map;

@RestController
public class RateController {
    @Autowired
    private RateRepository rateRepository;
    private Rate rate = new Rate();
    //test user ip
    @GetMapping(value = "ip")
    private static String getClientIp(HttpServletRequest request) {

        String remoteAddr = "";

        if (request != null) {
            remoteAddr = request.getHeader("X-FORWARDED-FOR");
            if (remoteAddr == null || "".equals(remoteAddr)) {
                remoteAddr = request.getRemoteAddr();
            }
        }

        return remoteAddr;
    }

    @PostMapping(value = "rate")
    public void addRateBuy(@RequestBody Rate rate){
        rateRepository.save(rate);
    }

    @GetMapping(value = "rate/rateUR")
    public Iterable<Rate> getRateLib(){
        return rateRepository.findByType("rateUR");
    }

    @GetMapping(value = "rate/rateER")
    public Iterable<Rate> getRateERLib(){
        return rateRepository.findByType("rateER");
    }

    @GetMapping(value = "rate/rateUE")
    public Iterable<Rate> getRateUELib(){
        return rateRepository.findByType("rateUE");
    }

    @GetMapping(value = "rate/rateEU")
    public Iterable<Rate> getRateEULib(){
        return rateRepository.findByType("rateEU");
    }

    @GetMapping(value = "rateUR")
    public Map<String, BigDecimal> genUR(){
        return rate.generateRate(20,150,90,125);
    }

    @GetMapping(value = "rateER")
    public Map<String, BigDecimal> genER(){
        return rate.generateRate(10,20,5,10);
    }

    @GetMapping(value = "rateUE")
    public Map<String, BigDecimal> genUE(){
        return rate.generateRate(15,22,10,13);
    }

    @GetMapping(value = "rateEU")
    public Map<String, BigDecimal> genEU(){
        return rate.generateRate(27,50,30,150);
    }

    @GetMapping(value = "clear_rate")
    public void clear_rate(){
        rateRepository.deleteAll();
    }

}