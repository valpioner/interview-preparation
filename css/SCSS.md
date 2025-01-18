# SCSS

SCSS is a CSS preprocessor (and CSS superset).

[Playground](https://sass-lang.com/playground/)

## Features

### Variables, Maps

```scss
$one: #333;
$two: #000 !default; // assigns only if it was not assigned so far
$colors-map: (
  "success": #28a745,
  "info": #17a2b8,
  "warning": #ffc107,
  dark: (
    "success": #28a745,
    "info": #17a2b8,
    "warning": #ffc107,
  );
);

.selector {
  color: $one; // color: #333;
  color: map.get($colors-map, "warning");
}
```

### Nesting

`&` is a parent selector.

```scss
.selector {
  $selector-ref: &; // $selector-ref: .selector;
  &-item {}     // .selector-item {}
  &:hover {}    // .selector:hover {}
  &.selector {} // .selector.selector {}
  .inner {}     // .selector .inner {}
  .outer & {}   // .outer .selector {}
  :not(&) {}    // :not(.selector) {}
  &__copy {     // .selector__copy
    &--open {}  // .selector__copy--open
  }
}
```

How to determine if `&` is present:

```scss
@mixin app-background($color) {
  #{if(&, '&.app-background', '.app-background')} {
    background-color: $color;
  }
}

// .app-background { background-color: #036; }
@include app-background(#036);

// .selector.app-background { background-color: #c6538c; }
.selector {
  @include app-background(#c6538c);
}
```

### Partials

Partial files should start with `_` name prefix.

Partial files are not transpiled into css, meaning `_partial.scss` won't become `partial.css` but will be ignored by SCSS preprocessor.

```scss
// using `_partial.scss`

@use 'partial';
```

### Modules

`@use 'file'` - This rule loads another Sass file as a module, which means you can refer to its variables, mixins, and functions in your Sass file with a namespace based on the filename

- No need to write a file extension.
- Generates a namespace same as a file name:

```scss
// _base.scss

$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

```scss
// styles.scss

@use 'colors';
// @use 'colors' as alias;

@use 'library' with (
  $black: #222,
  $border-radius: 0.1rem
);

.selector {
  background-color: colors.$primary-color;
  // background-color: alias.$primary-color;
}
```

```css
/* transpiled styles.css */

body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}

.selector {
  background-color: #333;
}
```

#### Modules provided by SCSS

```scss
@use "sass:math"; // +, -, *, %, math.div()
@use "sass:selector"; // selector.unify(...)
@use "sass:list";
@use "sass:color";
```

### Mixins

`@mixin` is a group of reusable CSS declarations, it will be replaced with an actual code in places where it is included.

```scss
//scss

@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}

.selector {
  @include theme;
  // @include theme($theme: DarkRed);
  // @include theme($theme: DarkRed) {
  //    ...content
  // };
}
```

```scss
// css

.selector {
  background: DarkGray;
  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
  color: #fff;
}
```

### Extend/Inheritance (Placeholder Selectors)

`%shared` declares a group of css, and instead of being replaced in places where it is extended, only one selector will be created including all selectors which extent it via comma.

```scss
//scss

%shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.selector {
  @extend %shared;
  border-color: green;
}
```

```scss
// css

.selector {
  background: DarkGray;
  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
  color: #fff;
}
```

### `@mixin` vs `%extendable`

The difference lies in the resulting CSS and a way of usage:

`@include mixin` will be replaced with the actual code in every place it is included. It might result in a code duplication in a separate selectors. Mixins can receive an arguments.

```scss
// scss

@mixin shared-bg {
  background-color: #333;
}

.one {
  @include shared-bg;
  color: red;
}

.two {
  @include shared-bg;
  color: red;
}
```

```scss
// css

.one {
  background-color: #333;
  color: red;
}

.two {
  background-color: #333;
  color: red;
}
```

`@extend %extendable` won't be included into the target selector, instead there will be create one big selector for all it's usages separated by comma. Usually better to use when you are expressing a relationship between semantic classes (`.error` and `.error-serious`)

```scss
// scss

// .error-base {
%error-base {
  background-color: #333;
}

.error-one {
  @extend %shared-bg;
  color: red;
}

.error-two {
  @extend %shared-bg;
  color: red;
}
```

```scss
// css

.error-two, .error-one {
  background-color: #333;
}

.error-one {
  color: red;
}

.error-two {
  color: red;
}
```

### Operators

```scss
// +, -, *, %, math.div()
@use "sass:math";

.selector {
  width: math.div(600px, 960px) * 100%; // 62.5%
}
```

### `@` at-rules

#### Loading / Importing styles

``` scss
// loads mixins, functions, and variables from other Sass stylesheets, and combines CSS from multiple stylesheets together.
@use './partial';

// loads a Sass stylesheet and makes its mixins, functions, and variables available when your stylesheet is loaded with the @use rule.
@forward './partial';

// extends the CSS at-rule to load styles, mixins, functions, and variables from other stylesheets. Does it during the compilation unlike CSS which sends HTTP requests during run-time.
// IMPORTANT: it is deprecated, and it is recommended to use `@use` instead. `@import` makes everything globally accessible which might result in naming collisions. @extent rule is also global
@import './partial';
```

#### Mixins / Extensions / Functions

``` scss
// makes it easy to re-use chunks of styles.
@mixin my-mixin {}
@include my-mixin;

// allows selectors to inherit styles from one another. Generates GLOBAL styles
%placeholder {}
@extend %placeholder;
@extend .selector;
@extend .selector !optional;

// defines custom functions that can be used in SassScript expressions.
@function my-func($arg, $optional: 'default-value', $rest...) {
  @return 'return-value';
};
$prop: my-func(3);
$prop: my-func($arg, $optional: 3px);
$prop: my-func($arg, $optional: 3px, 1 2 3);
$list: 1,2,3;
$prop: my-func($arg, $optional: 3px, $list...);
```

#### `@at-root`

``` scss
// puts styles within it at the root of the CSS document.
// It’s most often used when doing advanced nesting with the SassScript parent selector and selector functions.
@at-root .selector {}
```

#### Flow control

``` scss
// if

@if($rounded-corners, 5px, null) {};

@if not index($known-prefixes, $prefix) {
  @warn "Unknown prefix #{$prefix}.";
}

@if $property != left and $property != right {
  @error "Property #{$property} is invalid.";
}

$value: if($property == right, initial, $value);
```

``` scss
// each

@each $item in $items {};
```

#### Debugging

``` scss
@debug $variable;
@debug "divider offset: #{$divider-offset}";

@warn $variable;
@warn "Unknown prefix #{$prefix}.";

@error $variable;
@error $variable;
```

### Interpolation (dynamic properties)

``` scss
// scss

$id: 'one';

@mixin prefix($property, $value, $prefixes) {
  @each $prefix in $prefixes {
    -#{$prefix}-#{$property}: $value;
  }
  #{$property}: $value;
}

.selector-#{$id} {
  @include prefix(filter, grayscale(50%), moz webkit);
}
```

``` scss
// css

.selector-one {
  -moz-filter: grayscale(50%);
  -webkit-filter: grayscale(50%);
  filter: grayscale(50%);
}
```

Interpolation with numbers is a bad idea

``` scss
$width-as-number: 20;
$width-as-px: 20px;

// DON"T
prop: #{$width-as-number}px

// DO
prop: $width-as-number * 1px
prop: $width-as-px
```

### `@content`

A content block is lexically scoped, which means it can only see local variables in the scope where the mixin is included

```scss
// @content in @keyframes

@mixin keyframes($name) {
  @-moz-keyframes #{$name},
  @-webkit-keyframes #{$name}
  @keyframes #{$name} {
    @content;
  }
}

@include keyframes(fadeIn) {
  from { opacity: 0%; }
  to { opacity: 100%; }
}
```

```scss
// @content in @mixin

@mixin hover {
  &:hover {
    // list of default rules
    @content;
  }
}

.selector {
  @include hover {
    border-width: 2px;
  }
}

// @content in @mixin (passing args)

@mixin media($types...) {
  @each $type in $types {
    @media #{$type} {
      @content($type);
    }
  }
}

@include media(screen, print) using ($type) {
  h1 {
    @if $type == print {
      font-family: Calluna;
    }
  }
}
```

```scss
// @content in @media queries

@mixin small-screen {
  @media screen and (min-width: 800px;) {
    @content;
  }
}

@include small-screen {
  .container {
    width: 600px;
  }
}

// css result

@media screen and (min-width: 800px;) {
   .container {
      width: 600px;
    }
}
```

```scss
@content in Keyframes/Animations

```
