run-android:
	npm run android

run-ios:
	npm run ios

run:
	npm run start

android-release:
	export KEYSTORE_PASSWORD="$(KEYSTORE_PASSWORD)"
	export KEY_ALIAS="$(KEY_ALIAS)"
	export KEY_PASSWORD="$(KEY_PASSWORD)"
	cd android && ./gradlew assembleRelease

android-debug:
	cd android && ./gradlew assembleDebug