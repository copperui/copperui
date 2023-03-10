# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.7.0](https://github.com/copperui/copperui/compare/v0.6.0...v0.7.0) (2023-02-26)

### Features

- **core:** brx-switch ([#43](https://github.com/copperui/copperui/issues/43)) ([4f85f45](https://github.com/copperui/copperui/commit/4f85f45898415567c1504c316f09d4c8cb752e08))

# [0.6.0](https://github.com/copperui/copperui/compare/v0.5.1...v0.6.0) (2023-02-26)

### Bug Fixes

- **core:** brx-scrim: check if the close trigger is direct child of scrim ([5ad87cb](https://github.com/copperui/copperui/commit/5ad87cbe012c7d0f8f0384a563c777870da84740))

### Features

- **core:** brx-button: apply display-flex on brx-button-native ([08f9ab8](https://github.com/copperui/copperui/commit/08f9ab8cdb021512f58ea603e3faf941ff6d6b87))
- **core:** brx-dropdown-trigger: disable keepTargetVisibleWhenHidden by default ([7563b47](https://github.com/copperui/copperui/commit/7563b47f7f7afe7cd708fac5153713ed7a3078ab))
- **core:** brx-menu-item: declare `link` property ([58437bb](https://github.com/copperui/copperui/commit/58437bbde274a28a3ea1ab7b256890009e3d4d8d))
- **core:** brx-message: add slot for message-title ([92e6e8c](https://github.com/copperui/copperui/commit/92e6e8c9a11dbf56d9b895c1b90cda10e628de8b))
- **core:** brx-tabs: emit brxTabUpdate ([0f0eda9](https://github.com/copperui/copperui/commit/0f0eda983d3cda14d44d48624293dfc81de14d2a))
- **core:** remove `undefined` prop anottation for boolean props ([8d580bd](https://github.com/copperui/copperui/commit/8d580bd20d5169c70bcdaa386be7b17a60fde01b))

## [0.5.1](https://github.com/copperui/copperui/compare/v0.5.0...v0.5.1) (2023-02-22)

### Bug Fixes

- **core:** stencil.config.js: react: disable includeDefineCustomElements ([9fbfc6d](https://github.com/copperui/copperui/commit/9fbfc6dd1c3db102473065edbe00313a95c6f421))

# [0.5.0](https://github.com/copperui/copperui/compare/v0.4.3...v0.5.0) (2023-02-21)

### Features

- **core:** brx-header ([#46](https://github.com/copperui/copperui/issues/46)) ([f2f672a](https://github.com/copperui/copperui/commit/f2f672acb4a7c90460557c9333c3a2dd7290ea2d))
- **core:** brx-menu ([#48](https://github.com/copperui/copperui/issues/48)) ([74b0e1e](https://github.com/copperui/copperui/commit/74b0e1e2f785e3b9d61c75921f85ee9392073e57))
- **core:** brx-table ([#55](https://github.com/copperui/copperui/issues/55)) ([d138412](https://github.com/copperui/copperui/commit/d138412e1ebd764d246c20c37e5541fbca27453a))

## [0.4.3](https://github.com/copperui/copperui/compare/v0.4.2...v0.4.3) (2023-02-07)

### Bug Fixes

- **core:** brx-breadcrumb: remove list component ([4e84b51](https://github.com/copperui/copperui/commit/4e84b517f4e2666af9626df2befaf551f84cfcab))

## [0.4.2](https://github.com/copperui/copperui/compare/v0.4.1...v0.4.2) (2023-02-07)

**Note:** Version bump only for package @copperui/core

## [0.4.1](https://github.com/copperui/copperui/compare/v0.4.0...v0.4.1) (2023-02-07)

### Bug Fixes

- **core:** brx-scrim: set `data-active` and set default uncontrolled token ([fb13346](https://github.com/copperui/copperui/commit/fb133465a516f2c42844c15783e14a3793edcf36))
- **core:** include hydrate in npm package and add to .gitignore ([c803623](https://github.com/copperui/copperui/commit/c803623578534109e94bac0ba15423ede8424e28))

# [0.4.0](https://github.com/copperui/copperui/compare/v0.3.0...v0.4.0) (2023-02-07)

### Bug Fixes

- **core:** brx-select: fix select content float ([b57d123](https://github.com/copperui/copperui/commit/b57d123baf0da6070ec004a4b64703a5331ace0a))
- **core:** improve tooltip behaviour in brx-tabs and brx-step; provide controlledValue for brx-step ([d2099a1](https://github.com/copperui/copperui/commit/d2099a18da76b822bbca7e977683ea40f4344f25))

### Features

- **core:** stencil.config.js: add `dist-hydrate-script` output target ([c6faceb](https://github.com/copperui/copperui/commit/c6facebaa8583b39187d8b3b864f74042cd2bc92))
- **core:** [change] controlledChecked on brx-checkbox and brx-radio ([#72](https://github.com/copperui/copperui/issues/72)) ([2d445b2](https://github.com/copperui/copperui/commit/2d445b2e5a8f5d9e75d00f9bd9cd1a5476fa9893))
- **core:** brx-datetimepicker: allow value of type Date, string and number; implement brxChange ([ebd19d0](https://github.com/copperui/copperui/commit/ebd19d00b525d5771a5c78801791b66654ccc6c3))
- **core:** brx-input: controlled-value ([#76](https://github.com/copperui/copperui/issues/76)) ([83608fa](https://github.com/copperui/copperui/commit/83608fab8247cbbe732850bce7ed7d4f4bb8bb0d))
- **core:** brx-pagination contextual ([#50](https://github.com/copperui/copperui/issues/50)) ([015550a](https://github.com/copperui/copperui/commit/015550aaa209dfb053822633c430a08bfe28f1d6))
- **core:** brx-radio and brx-radio-group: controlled-checked and controlled-value ([#76](https://github.com/copperui/copperui/issues/76)) ([c13b53d](https://github.com/copperui/copperui/commit/c13b53de9376f5d5f285c21a7aa0f48afb4b7902))
- **core:** brx-scrim: controlled-active ([#76](https://github.com/copperui/copperui/issues/76)) ([ff3ace5](https://github.com/copperui/copperui/commit/ff3ace55addbe5e43e6a03dfe6167bd449015767))
- **core:** brx-select: brxFilterInputChange event ([#51](https://github.com/copperui/copperui/issues/51)) ([bf1f690](https://github.com/copperui/copperui/commit/bf1f6908d071085895c1859292372f83b693400e))
- **core:** brx-select: keyboard events and focus ([#51](https://github.com/copperui/copperui/issues/51)) [WIP] ([846946f](https://github.com/copperui/copperui/commit/846946fcd775e1a59fc80b1dd69454a018207105))
- **core:** brx-textarea: controlled-value ([#76](https://github.com/copperui/copperui/issues/76)) ([0d16b2c](https://github.com/copperui/copperui/commit/0d16b2c11f360eba75223366b22e9720dac3f9d6))
- **core:** components: brx-datetimepicker ([#53](https://github.com/copperui/copperui/issues/53)) [WIP] ([b33f4b9](https://github.com/copperui/copperui/commit/b33f4b91d1f0a437d31b9eb5e2a4984b610b4f94))
- **core:** components: brx-pagination ([#50](https://github.com/copperui/copperui/issues/50)) [WIP] ([02681bc](https://github.com/copperui/copperui/commit/02681bcba662ddae14a8bfec2c0ad46632cf6b14))
- **core:** components: brx-select core logic ([#51](https://github.com/copperui/copperui/issues/51)) [WIP] ([74d6a5d](https://github.com/copperui/copperui/commit/74d6a5d35761069f422f6e68972f4ea20e2fd43e))
- **core:** helpers: drop nanoid dependency from generateUniqueId logic ([1df865f](https://github.com/copperui/copperui/commit/1df865f7b7e9f1cbe2bc12d5b2c9fd21c7fbf1d9))

### Performance Improvements

- **core:** html: split demo playground in separate components files ([c98cff1](https://github.com/copperui/copperui/commit/c98cff1b9d2c084481a9b6c0b8d03d3682e1e56b))

# [0.3.0](https://github.com/copperui/copperui/compare/v0.2.0...v0.3.0) (2023-01-29)

### Features

- **core:** components: brx-upload ([#58](https://github.com/copperui/copperui/issues/58)) ([c526a2f](https://github.com/copperui/copperui/commit/c526a2f35fd66b2f1137bda6f89d1b0e8bbb9621))

# [0.2.0](https://github.com/copperui/copperui/compare/v0.1.1...v0.2.0) (2023-01-25)

### Features

- **core:** components: brx-tabs: add tabClick event ([5f99adb](https://github.com/copperui/copperui/commit/5f99adb574e90e1d4f5385186979f33698558cff))

# 0.1.0 (2023-01-25)

### Features

- **core:** components: brx-accordion-legacy ([#1](https://github.com/copperui/copperui/issues/1)) ([14afdcf](https://github.com/copperui/copperui/commit/14afdcf64e26bf7b806fd203aa645546f89358ae))
- **core:** components: brx-accordion-trigger ([#30](https://github.com/copperui/copperui/issues/30)) ([84b5fc8](https://github.com/copperui/copperui/commit/84b5fc8e641c2598be1b9e41e3df1694b7fe6c1d))
- **core:** components: brx-avatar ([#3](https://github.com/copperui/copperui/issues/3)) ([27343c3](https://github.com/copperui/copperui/commit/27343c30ab1225c1f658f091335824de6f9d3f6d))
- **core:** components: brx-breadcrumb ([#32](https://github.com/copperui/copperui/issues/32)) ([063ae88](https://github.com/copperui/copperui/commit/063ae88d0ae0f785391062fa0444eee856748406))
- **core:** components: brx-button ([#6](https://github.com/copperui/copperui/issues/6)) ([347d8c6](https://github.com/copperui/copperui/commit/347d8c6b6a9f817100bf7bc0f5456baca9d246c7))
- **core:** components: brx-button magic [#42](https://github.com/copperui/copperui/issues/42) ([37ecfc5](https://github.com/copperui/copperui/commit/37ecfc53dfb986e06f56dc0161c6441424a4f50a)), closes [#43](https://github.com/copperui/copperui/issues/43)
- **core:** components: brx-card ([#31](https://github.com/copperui/copperui/issues/31)) ([0310d5b](https://github.com/copperui/copperui/commit/0310d5b27419a1d8325e32ff4e75bb7b2df54a2f))
- **core:** components: brx-checkbox ([#13](https://github.com/copperui/copperui/issues/13)) ([3fe0322](https://github.com/copperui/copperui/commit/3fe03220f69615800caee6c6503645161d4ca749)), closes [/github.com/copperui/copperui/issues/13#issuecomment-1374668322](https://github.com//github.com/copperui/copperui/issues/13/issues/issuecomment-1374668322)
- **core:** components: brx-checkgroup ([#29](https://github.com/copperui/copperui/issues/29)) ([8ecf513](https://github.com/copperui/copperui/commit/8ecf513dd6656c4a17403b099189c6e507ed5e94))
- **core:** components: brx-collapse-trigger ([#23](https://github.com/copperui/copperui/issues/23)) ([2c3880c](https://github.com/copperui/copperui/commit/2c3880c0a9f78dbf2bdb3bd09ab075d79c18a2a4))
- **core:** components: brx-divider ([#18](https://github.com/copperui/copperui/issues/18)) ([10c4914](https://github.com/copperui/copperui/commit/10c49145fd48eda673c59cd2584f3f5c506a96df))
- **core:** components: brx-dropdown ([#22](https://github.com/copperui/copperui/issues/22)) ([b9d8d89](https://github.com/copperui/copperui/commit/b9d8d8909fdb8f5a3b3d119b3a5242aa32e3762e))
- **core:** components: brx-icon ([80c32ba](https://github.com/copperui/copperui/commit/80c32ba54618c4e19fed724e51c6d88ba3b37d51))
- **core:** components: brx-input ([#28](https://github.com/copperui/copperui/issues/28)) ([47d0019](https://github.com/copperui/copperui/commit/47d001948f753018f9d3bb9bf0d699f44e5a39eb))
- **core:** components: brx-item ([#12](https://github.com/copperui/copperui/issues/12)) ([92154c7](https://github.com/copperui/copperui/commit/92154c72810127f0bc3815e2b5f88880f2d419e7))
- **core:** components: brx-list ([#20](https://github.com/copperui/copperui/issues/20)) ([ae9a72d](https://github.com/copperui/copperui/commit/ae9a72d86ea422d6a6359a3915ee0499129c8161))
- **core:** components: brx-loading ([#7](https://github.com/copperui/copperui/issues/7)) ([185c5ea](https://github.com/copperui/copperui/commit/185c5ea4c57c9730b7c15f4a14e24997eded64d7))
- **core:** components: brx-message ([#35](https://github.com/copperui/copperui/issues/35)) ([c58e9b8](https://github.com/copperui/copperui/commit/c58e9b8ef0be1e284a7b399e1306de6b0fdaa5d9))
- **core:** components: brx-modal ([#10](https://github.com/copperui/copperui/issues/10)) ([9107977](https://github.com/copperui/copperui/commit/9107977ace1cf0744d0f7def4ba60d143a6e7788))
- **core:** components: brx-notification ([#49](https://github.com/copperui/copperui/issues/49)) ([6a9199c](https://github.com/copperui/copperui/commit/6a9199c0627ee1036c62bbc428d591892c072cc6))
- **core:** components: brx-radio + brx-radio-group ([ce7c23c](https://github.com/copperui/copperui/commit/ce7c23c9eeba42d9ed7cc3cdd0ef008351680355)), closes [#14](https://github.com/copperui/copperui/issues/14) [#14](https://github.com/copperui/copperui/issues/14)
- **core:** components: brx-scrim and ([1e47f7b](https://github.com/copperui/copperui/commit/1e47f7bbca9dda3c28dedb4cd6e44136a9085e7d)), closes [#9](https://github.com/copperui/copperui/issues/9) [#9](https://github.com/copperui/copperui/issues/9)
- **core:** components: brx-signin ([#27](https://github.com/copperui/copperui/issues/27)) ([6399b6f](https://github.com/copperui/copperui/commit/6399b6f308da1e727e21df1f02cf41301677c11f))
- **core:** components: brx-skiplink ([#57](https://github.com/copperui/copperui/issues/57)) ([977ecd8](https://github.com/copperui/copperui/commit/977ecd818ffc8db84f4a75a2dcf63a6b2185d1af))
- **core:** components: brx-step ([#52](https://github.com/copperui/copperui/issues/52)) ([87045b7](https://github.com/copperui/copperui/commit/87045b766c35169bb7fa0d615b893153a7653a3c))
- **core:** components: brx-tabs + ([#54](https://github.com/copperui/copperui/issues/54)) ([8996145](https://github.com/copperui/copperui/commit/89961452e313e36ba808371e44569314861abfaa))
- **core:** components: brx-tag ([#56](https://github.com/copperui/copperui/issues/56)) ([6c678eb](https://github.com/copperui/copperui/commit/6c678eb05be1edcb47dcb8657a8f9a2289707aa8))
- **core:** components: brx-textarea ([#44](https://github.com/copperui/copperui/issues/44)) ([4da414a](https://github.com/copperui/copperui/commit/4da414a70d27d6c0656514bc705c4e146cf351fb))
- **core:** components: brx-tooltip ([#4](https://github.com/copperui/copperui/issues/4)) ([d64018a](https://github.com/copperui/copperui/commit/d64018a5ec434efd399a5ce5044f5d96aa699471))
- **core:** html: index.html: list: add examples with collapse ([fe0a561](https://github.com/copperui/copperui/commit/fe0a5618e1789a59da9ac727fd5a1ddfee03b22b))
- **core:** shamefully copy scss styles from the oficial project ([fd818d7](https://github.com/copperui/copperui/commit/fd818d7beb72d0d54654ccb015ab359df04f7e4c))
- **docs:** replace sb with docusauros scaffold ([325a1ae](https://github.com/copperui/copperui/commit/325a1ae2e75b7f68ddd99a491788375e7f8d3103))
- init ([7de5f52](https://github.com/copperui/copperui/commit/7de5f52f09c0cacebd0d2ae68cc305084d6ed4f5))
