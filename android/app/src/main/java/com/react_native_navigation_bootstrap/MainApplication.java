package com.react_native_navigation_bootstrap;

import android.support.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.stetho.Stetho;
import com.reactnativenavigation.NavigationApplication;

import java.util.List;

public class MainApplication extends NavigationApplication {


  public void onCreate() {
    super.onCreate();

    if (BuildConfig.DEBUG) {
      StethoWrapper.initialize(this);
      StethoWrapper.addInterceptor();
    }

    SoLoader.init(this, /* native exopackage */ false);
  }


  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  @NonNull
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    // Add the packages you require here.
    // No need to add RnnPackage and MainReactPackage
    return null;
  }

}
