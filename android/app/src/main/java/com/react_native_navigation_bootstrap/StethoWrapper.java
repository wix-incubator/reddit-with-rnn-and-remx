package com.react_native_navigation_bootstrap;

import android.content.Context;

import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.stetho.Stetho;
import com.facebook.stetho.okhttp3.StethoInterceptor;

import okhttp3.OkHttpClient;

/**
 * Created by levv on 14/10/2017.
 */

public class StethoWrapper {
    public static void initialize(Context context) {
        Stetho.initializeWithDefaults(context);
    }

    public static void addInterceptor() {
        OkHttpClient client = OkHttpClientProvider.getOkHttpClient()
                .newBuilder()
                .addNetworkInterceptor(new StethoInterceptor())
                .build();

        OkHttpClientProvider.replaceOkHttpClient(client);
    }
}
