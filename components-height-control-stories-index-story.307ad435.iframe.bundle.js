"use strict";(self.webpackChunkgutenberg=self.webpackChunkgutenberg||[]).push([[6265],{"./node_modules/@babel/runtime/helpers/esm/typeof.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}__webpack_require__.d(__webpack_exports__,{Z:function(){return _typeof}})},"./packages/a11y/build-module/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{D:function(){return speak}});var build_module=__webpack_require__("./packages/i18n/build-module/index.js");function addContainer(ariaLive="polite"){const container=document.createElement("div");container.id=`a11y-speak-${ariaLive}`,container.className="a11y-speak-region",container.setAttribute("style","position: absolute;margin: -1px;padding: 0;height: 1px;width: 1px;overflow: hidden;clip: rect(1px, 1px, 1px, 1px);-webkit-clip-path: inset(50%);clip-path: inset(50%);border: 0;word-wrap: normal !important;"),container.setAttribute("aria-live",ariaLive),container.setAttribute("aria-relevant","additions text"),container.setAttribute("aria-atomic","true");const{body:body}=document;return body&&body.appendChild(container),container}let previousMessage="";function speak(message,ariaLive){!function clear(){const regions=document.getElementsByClassName("a11y-speak-region"),introText=document.getElementById("a11y-speak-intro-text");for(let i=0;i<regions.length;i++)regions[i].textContent="";introText&&introText.setAttribute("hidden","hidden")}(),message=function filterMessage(message){return message=message.replace(/<[^<>]+>/g," "),previousMessage===message&&(message+=" "),previousMessage=message,message}(message);const introText=document.getElementById("a11y-speak-intro-text"),containerAssertive=document.getElementById("a11y-speak-assertive"),containerPolite=document.getElementById("a11y-speak-polite");containerAssertive&&"assertive"===ariaLive?containerAssertive.textContent=message:containerPolite&&(containerPolite.textContent=message),introText&&introText.removeAttribute("hidden")}!function domReady(callback){"undefined"!=typeof document&&("complete"!==document.readyState&&"interactive"!==document.readyState?document.addEventListener("DOMContentLoaded",callback):callback())}((function setup(){const introText=document.getElementById("a11y-speak-intro-text"),containerAssertive=document.getElementById("a11y-speak-assertive"),containerPolite=document.getElementById("a11y-speak-polite");null===introText&&function addIntroText(){const introText=document.createElement("p");introText.id="a11y-speak-intro-text",introText.className="a11y-speak-intro-text",introText.textContent=(0,build_module.__)("Notifications"),introText.setAttribute("style","position: absolute;margin: -1px;padding: 0;height: 1px;width: 1px;overflow: hidden;clip: rect(1px, 1px, 1px, 1px);-webkit-clip-path: inset(50%);clip-path: inset(50%);border: 0;word-wrap: normal !important;"),introText.setAttribute("hidden","hidden");const{body:body}=document;return body&&body.appendChild(introText),introText}(),null===containerAssertive&&addContainer("assertive"),null===containerPolite&&addContainer("polite")}))},"./packages/block-editor/src/components/block-edit/context.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{FF:function(){return DEFAULT_BLOCK_EDIT_CONTEXT},Q2:function(){return Provider},Z8:function(){return useBlockEditContext}});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const DEFAULT_BLOCK_EDIT_CONTEXT={name:"",isSelected:!1},Context=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)(DEFAULT_BLOCK_EDIT_CONTEXT),{Provider:Provider}=Context;function useBlockEditContext(){return(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(Context)}},"./packages/block-editor/src/components/use-settings/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{r:function(){return useSettings}});var build_module=__webpack_require__("./packages/blocks/build-module/index.js"),use_select=__webpack_require__("./packages/data/build-module/components/use-select/index.js"),react=__webpack_require__("./node_modules/react/index.js"),hooks_build_module=__webpack_require__("./packages/hooks/build-module/index.js"),context=__webpack_require__("./packages/block-editor/src/components/block-edit/context.js"),store=__webpack_require__("./packages/block-editor/src/store/index.js");const stringToPath=(0,__webpack_require__("./node_modules/memize/dist/index.js").Z)((path=>path.split("."))),getValueFromObjectPath=(object,path,defaultValue)=>{var _value;const normalizedPath=Array.isArray(path)?path:stringToPath(path);let value=object;return normalizedPath.forEach((fieldName=>{value=value?.[fieldName]})),null!==(_value=value)&&void 0!==_value?_value:defaultValue},blockedPaths=["color","border","dimensions","typography","spacing"],deprecatedFlags={"color.palette":settings=>settings.colors,"color.gradients":settings=>settings.gradients,"color.custom":settings=>void 0===settings.disableCustomColors?void 0:!settings.disableCustomColors,"color.customGradient":settings=>void 0===settings.disableCustomGradients?void 0:!settings.disableCustomGradients,"typography.fontSizes":settings=>settings.fontSizes,"typography.customFontSize":settings=>void 0===settings.disableCustomFontSizes?void 0:!settings.disableCustomFontSizes,"typography.lineHeight":settings=>settings.enableCustomLineHeight,"spacing.units":settings=>{if(void 0!==settings.enableCustomUnits)return!0===settings.enableCustomUnits?["px","em","rem","vh","vw","%"]:settings.enableCustomUnits},"spacing.padding":settings=>settings.enableCustomSpacing},prefixedFlags={"border.customColor":"border.color","border.customStyle":"border.style","border.customWidth":"border.width","typography.customFontStyle":"typography.fontStyle","typography.customFontWeight":"typography.fontWeight","typography.customLetterSpacing":"typography.letterSpacing","typography.customTextDecorations":"typography.textDecoration","typography.customTextTransforms":"typography.textTransform","border.customRadius":"border.radius","spacing.customMargin":"spacing.margin","spacing.customPadding":"spacing.padding","typography.customLineHeight":"typography.lineHeight"},removeCustomPrefixes=path=>prefixedFlags[path]||path;const mergeCache=new WeakMap;function useSettings(...paths){const{name:blockName,clientId:clientId=null}=(0,context.Z8)();return paths=(0,react.useMemo)((()=>paths),paths),(0,use_select.Z)((select=>{const candidates=clientId?[clientId,...select(store.h).getBlockParents(clientId,!0)].filter((candidateClientId=>{const candidateBlockName=select(store.h).getBlockName(candidateClientId);return(0,build_module.zb)(candidateBlockName,"__experimentalSettings",!1)})):[];return paths.map((path=>{if(blockedPaths.includes(path))return void console.warn("Top level useSetting paths are disabled. Please use a subpath to query the information needed.");let result=(0,hooks_build_module.O)("blockEditor.useSetting.before",void 0,path,clientId,blockName);if(void 0!==result)return result;const normalizedPath=removeCustomPrefixes(path);for(const candidateClientId of candidates){var _getValueFromObjectPa;const candidateAtts=select(store.h).getBlockAttributes(candidateClientId);if(result=null!==(_getValueFromObjectPa=getValueFromObjectPath(candidateAtts.settings?.blocks?.[blockName],normalizedPath))&&void 0!==_getValueFromObjectPa?_getValueFromObjectPa:getValueFromObjectPath(candidateAtts.settings,normalizedPath),void 0!==result)break}const settings=select(store.h).getSettings();if(void 0===result&&blockName&&(result=getValueFromObjectPath(settings.__experimentalFeatures?.blocks?.[blockName],normalizedPath)),void 0===result&&(result=getValueFromObjectPath(settings.__experimentalFeatures,normalizedPath)),void 0!==result)return build_module.yg[normalizedPath]?function mergeOrigins(value){let result=mergeCache.get(value);return result||(result=["default","theme","custom"].flatMap((key=>{var _value$key;return null!==(_value$key=value[key])&&void 0!==_value$key?_value$key:[]})),mergeCache.set(value,result)),result}(result):result;const deprecatedSettingsValue=deprecatedFlags[normalizedPath]?.(settings);return void 0!==deprecatedSettingsValue?deprecatedSettingsValue:"typography.dropCap"===normalizedPath||void 0}))}),[blockName,clientId,paths])}},"./packages/compose/build-module/hooks/use-merge-refs/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return useMergeRefs}});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function assignRef(ref,value){"function"==typeof ref?ref(value):ref&&ref.hasOwnProperty("current")&&(ref.current=value)}function useMergeRefs(refs){const element=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(),isAttached=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),didElementChange=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),previousRefs=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)([]),currentRefs=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(refs);return currentRefs.current=refs,(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((()=>{!1===didElementChange.current&&!0===isAttached.current&&refs.forEach(((ref,index)=>{const previousRef=previousRefs.current[index];ref!==previousRef&&(assignRef(previousRef,null),assignRef(ref,element.current))})),previousRefs.current=refs}),refs),(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)((()=>{didElementChange.current=!1})),(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((value=>{assignRef(element,value),didElementChange.current=!0,isAttached.current=null!==value;const refsToAssign=value?currentRefs.current:previousRefs.current;for(const ref of refsToAssign)assignRef(ref,value)}),[])}},"./packages/compose/build-module/hooks/use-ref-effect/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return useRefEffect}});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function useRefEffect(callback,dependencies){const cleanup=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();return(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((node=>{node?cleanup.current=callback(node):cleanup.current&&cleanup.current()}),dependencies)}},"./packages/icons/build-module/library/plus.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/primitives/build-module/svg/index.js");const plus=(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Wj,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.y$,{d:"M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z"}));__webpack_exports__.Z=plus},"./packages/is-shallow-equal/build-module/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{ZP:function(){return isShallowEqual}});var objects=__webpack_require__("./packages/is-shallow-equal/build-module/objects.js");function isShallowEqual(a,b){if(a&&b){if(a.constructor===Object&&b.constructor===Object)return(0,objects.Z)(a,b);if(Array.isArray(a)&&Array.isArray(b))return function isShallowEqualArrays(a,b){if(a===b)return!0;if(a.length!==b.length)return!1;for(let i=0,len=a.length;i<len;i++)if(a[i]!==b[i])return!1;return!0}(a,b)}return a===b}},"./packages/is-shallow-equal/build-module/objects.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function isShallowEqualObjects(a,b){if(a===b)return!0;const aKeys=Object.keys(a),bKeys=Object.keys(b);if(aKeys.length!==bKeys.length)return!1;let i=0;for(;i<aKeys.length;){const key=aKeys[i],aValue=a[key];if(void 0===aValue&&!b.hasOwnProperty(key)||aValue!==b[key])return!1;i++}return!0}__webpack_require__.d(__webpack_exports__,{Z:function(){return isShallowEqualObjects}})},"./packages/keycodes/build-module/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Ac:function(){return rawShortcut},Bi:function(){return PAGEDOWN},E_:function(){return displayShortcut},J3:function(){return shortcutAriaLabel},K5:function(){return ENTER},L_:function(){return SPACE},Mf:function(){return TAB},RL:function(){return LEFT},Sd:function(){return HOME},UP:function(){return UP},WV:function(){return DOWN},ZH:function(){return BACKSPACE},hY:function(){return ESCAPE},kC:function(){return F10},pX:function(){return RIGHT},uR:function(){return END},vd:function(){return isKeyboardEvent},wx:function(){return PAGEUP},yY:function(){return DELETE}});var change_case__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/capital-case/dist.es2015/index.js"),_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/i18n/build-module/index.js"),_platform__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/keycodes/build-module/platform.js");const BACKSPACE=8,TAB=9,ENTER=13,ESCAPE=27,SPACE=32,PAGEUP=33,PAGEDOWN=34,END=35,HOME=36,LEFT=37,UP=38,RIGHT=39,DOWN=40,DELETE=46,F10=121,ALT="alt",CTRL="ctrl",COMMAND="meta",SHIFT="shift";function mapValues(object,mapFn){return Object.fromEntries(Object.entries(object).map((([key,value])=>[key,mapFn(value)])))}const modifiers={primary:_isApple=>_isApple()?[COMMAND]:[CTRL],primaryShift:_isApple=>_isApple()?[SHIFT,COMMAND]:[CTRL,SHIFT],primaryAlt:_isApple=>_isApple()?[ALT,COMMAND]:[CTRL,ALT],secondary:_isApple=>_isApple()?[SHIFT,ALT,COMMAND]:[CTRL,SHIFT,ALT],access:_isApple=>_isApple()?[CTRL,ALT]:[SHIFT,ALT],ctrl:()=>[CTRL],alt:()=>[ALT],ctrlShift:()=>[CTRL,SHIFT],shift:()=>[SHIFT],shiftAlt:()=>[SHIFT,ALT],undefined:()=>[]},rawShortcut=mapValues(modifiers,(modifier=>(character,_isApple=_platform__WEBPACK_IMPORTED_MODULE_1__.R)=>[...modifier(_isApple),character.toLowerCase()].join("+"))),displayShortcutList=mapValues(modifiers,(modifier=>(character,_isApple=_platform__WEBPACK_IMPORTED_MODULE_1__.R)=>{const isApple=_isApple(),replacementKeyMap={[ALT]:isApple?"⌥":"Alt",[CTRL]:isApple?"⌃":"Ctrl",[COMMAND]:"⌘",[SHIFT]:isApple?"⇧":"Shift"};return[...modifier(_isApple).reduce(((accumulator,key)=>{var _replacementKeyMap$ke;const replacementKey=null!==(_replacementKeyMap$ke=replacementKeyMap[key])&&void 0!==_replacementKeyMap$ke?_replacementKeyMap$ke:key;return isApple?[...accumulator,replacementKey]:[...accumulator,replacementKey,"+"]}),[]),(0,change_case__WEBPACK_IMPORTED_MODULE_2__.I)(character,{stripRegexp:/[^A-Z0-9~`,\.\\\-]/gi})]})),displayShortcut=mapValues(displayShortcutList,(shortcutList=>(character,_isApple=_platform__WEBPACK_IMPORTED_MODULE_1__.R)=>shortcutList(character,_isApple).join(""))),shortcutAriaLabel=mapValues(modifiers,(modifier=>(character,_isApple=_platform__WEBPACK_IMPORTED_MODULE_1__.R)=>{const isApple=_isApple(),replacementKeyMap={[SHIFT]:"Shift",[COMMAND]:isApple?"Command":"Control",[CTRL]:"Control",[ALT]:isApple?"Option":"Alt",",":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Comma"),".":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Period"),"`":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Backtick"),"~":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Tilde")};return[...modifier(_isApple),character].map((key=>{var _replacementKeyMap$ke2;return(0,change_case__WEBPACK_IMPORTED_MODULE_2__.I)(null!==(_replacementKeyMap$ke2=replacementKeyMap[key])&&void 0!==_replacementKeyMap$ke2?_replacementKeyMap$ke2:key)})).join(isApple?" ":" + ")}));const isKeyboardEvent=mapValues(modifiers,(getModifiers=>(event,character,_isApple=_platform__WEBPACK_IMPORTED_MODULE_1__.R)=>{const mods=getModifiers(_isApple),eventMods=function getEventModifiers(event){return[ALT,CTRL,COMMAND,SHIFT].filter((key=>event[`${key}Key`]))}(event),replacementWithShiftKeyMap={Comma:",",Backslash:"\\",IntlRo:"\\",IntlYen:"\\"},modsDiff=mods.filter((mod=>!eventMods.includes(mod))),eventModsDiff=eventMods.filter((mod=>!mods.includes(mod)));if(modsDiff.length>0||eventModsDiff.length>0)return!1;let key=event.key.toLowerCase();return character?(event.altKey&&1===character.length&&(key=String.fromCharCode(event.keyCode).toLowerCase()),event.shiftKey&&1===character.length&&replacementWithShiftKeyMap[event.code]&&(key=replacementWithShiftKeyMap[event.code]),"del"===character&&(character="delete"),key===character.toLowerCase()):mods.includes(key)}))},"./packages/keycodes/build-module/platform.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function isAppleOS(_window=null){if(!_window){if("undefined"==typeof window)return!1;_window=window}const{platform:platform}=_window.navigator;return-1!==platform.indexOf("Mac")||["iPad","iPhone"].includes(platform)}__webpack_require__.d(__webpack_exports__,{R:function(){return isAppleOS}})},"./packages/primitives/build-module/svg/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Cd:function(){return Circle},G:function(){return G},UL:function(){return Rect},Wj:function(){return SVG},y$:function(){return Path}});var classnames__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__),_wordpress_element__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js");const Circle=props=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle",props),G=props=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g",props),Path=props=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path",props),Rect=props=>(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect",props),SVG=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((({className:className,isPressed:isPressed,...props},ref)=>{const appliedProps={...props,className:classnames__WEBPACK_IMPORTED_MODULE_0___default()(className,{"is-pressed":isPressed})||void 0,"aria-hidden":!0,focusable:!1};return(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg",{...appliedProps,ref:ref})}));SVG.displayName="SVG"},"./packages/block-editor/src/components/height-control/stories/index.story.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return index_story}});var react=__webpack_require__("./node_modules/react/index.js"),utils=__webpack_require__("./packages/components/build-module/unit-control/utils.js"),base_control=__webpack_require__("./packages/components/build-module/base-control/index.js"),component=__webpack_require__("./packages/components/build-module/flex/flex/component.js"),flex_item_component=__webpack_require__("./packages/components/build-module/flex/flex-item/component.js"),unit_control=__webpack_require__("./packages/components/build-module/unit-control/index.js"),spacer_component=__webpack_require__("./packages/components/build-module/spacer/component.js"),range_control=__webpack_require__("./packages/components/build-module/range-control/index.js"),build_module=__webpack_require__("./packages/i18n/build-module/index.js"),use_settings=__webpack_require__("./packages/block-editor/src/components/use-settings/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const RANGE_CONTROL_CUSTOM_SETTINGS={px:{max:1e3,step:1},"%":{max:100,step:1},vw:{max:100,step:1},vh:{max:100,step:1},em:{max:50,step:.1},rem:{max:50,step:.1},svw:{max:100,step:1},lvw:{max:100,step:1},dvw:{max:100,step:1},svh:{max:100,step:1},lvh:{max:100,step:1},dvh:{max:100,step:1},vi:{max:100,step:1},svi:{max:100,step:1},lvi:{max:100,step:1},dvi:{max:100,step:1},vb:{max:100,step:1},svb:{max:100,step:1},lvb:{max:100,step:1},dvb:{max:100,step:1},vmin:{max:100,step:1},svmin:{max:100,step:1},lvmin:{max:100,step:1},dvmin:{max:100,step:1},vmax:{max:100,step:1},svmax:{max:100,step:1},lvmax:{max:100,step:1},dvmax:{max:100,step:1}};function HeightControl({label:label=(0,build_module.__)("Height"),onChange:onChange,value:value}){var _RANGE_CONTROL_CUSTOM,_RANGE_CONTROL_CUSTOM2;const customRangeValue=parseFloat(value),[availableUnits]=(0,use_settings.r)("spacing.units"),units=(0,utils.nj)({availableUnits:availableUnits||["%","px","em","rem","vh","vw"]}),selectedUnit=(0,react.useMemo)((()=>(0,utils.YX)(value)),[value])[1]||units[0]?.value||"px";return(0,jsx_runtime.jsxs)("fieldset",{className:"block-editor-height-control",children:[(0,jsx_runtime.jsx)(base_control.ZP.VisualLabel,{as:"legend",children:label}),(0,jsx_runtime.jsxs)(component.Z,{children:[(0,jsx_runtime.jsx)(flex_item_component.Z,{isBlock:!0,children:(0,jsx_runtime.jsx)(unit_control.ZP,{value:value,units:units,onChange:onChange,onUnitChange:newUnit=>{const[currentValue,currentUnit]=(0,utils.YX)(value);["em","rem"].includes(newUnit)&&"px"===currentUnit?onChange((currentValue/16).toFixed(2)+newUnit):["em","rem"].includes(currentUnit)&&"px"===newUnit?onChange(Math.round(16*currentValue)+newUnit):["%","vw","svw","lvw","dvw","vh","svh","lvh","dvh","vi","svi","lvi","dvi","vb","svb","lvb","dvb","vmin","svmin","lvmin","dvmin","vmax","svmax","lvmax","dvmax"].includes(newUnit)&&currentValue>100&&onChange(100+newUnit)},min:0,size:"__unstable-large"})}),(0,jsx_runtime.jsx)(flex_item_component.Z,{isBlock:!0,children:(0,jsx_runtime.jsx)(spacer_component.Z,{marginX:2,marginBottom:0,children:(0,jsx_runtime.jsx)(range_control.Z,{value:customRangeValue,min:0,max:null!==(_RANGE_CONTROL_CUSTOM=RANGE_CONTROL_CUSTOM_SETTINGS[selectedUnit]?.max)&&void 0!==_RANGE_CONTROL_CUSTOM?_RANGE_CONTROL_CUSTOM:100,step:null!==(_RANGE_CONTROL_CUSTOM2=RANGE_CONTROL_CUSTOM_SETTINGS[selectedUnit]?.step)&&void 0!==_RANGE_CONTROL_CUSTOM2?_RANGE_CONTROL_CUSTOM2:.1,withInputField:!1,onChange:next=>{onChange([next,selectedUnit].join(""))},__nextHasNoMarginBottom:!0})})})]})]})}HeightControl.displayName="HeightControl",HeightControl.__docgenInfo={description:"HeightControl renders a linked unit control and range control for adjusting the height of a block.\n\n@see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/height-control/README.md\n\n@param {Object}                     props\n@param {?string}                    props.label    A label for the control.\n@param {( value: string ) => void } props.onChange Called when the height changes.\n@param {string}                     props.value    The current height value.\n\n@return {Component} The component to be rendered.",methods:[],displayName:"HeightControl",props:{label:{defaultValue:{value:"__( 'Height' )",computed:!0},required:!1}}};var index_story={component:HeightControl,title:"BlockEditor/HeightControl",parameters:{sourceLink:"packages/block-editor/src/components/height-control"}};const Template=props=>{const[value,setValue]=(0,react.useState)();return(0,jsx_runtime.jsx)(HeightControl,{onChange:setValue,value:value,...props})};Template.displayName="Template";const Default=Template.bind({});Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"props => {\n  const [value, setValue] = useState();\n  return <HeightControl onChange={setValue} value={value} {...props} />;\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]}}]);