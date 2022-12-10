import * as React from 'react'

const SvgComponent = (props) => (
  <svg width={201} height={27} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M136.146 14.986v11.243h-4.15V1.33h4.15v9.257h3.443V1.329h4.151v24.9h-4.151V14.486h-3.443v.5Zm15.206 6.939.003.005c.299.524.805.767 1.405.767.281 0 .549-.07.787-.223a1.59 1.59 0 0 0 .541-.618c.251-.487.35-1.153.35-1.94V7.275c0-.672-.098-1.258-.359-1.692-.284-.475-.737-.721-1.289-.721-.579 0-1.069.23-1.389.713-.295.446-.406 1.052-.406 1.744v12.626c0 .821.096 1.51.357 1.98Zm5.753-19.267.002.002c.97 1.023 1.496 2.562 1.496 4.703v12.303c0 2.293-.533 3.968-1.525 5.1-.971 1.112-2.397 1.699-4.362 1.699-1.964 0-3.395-.587-4.377-1.698-.981-1.133-1.51-2.808-1.51-5.101V7.363c0-2.141.521-3.681 1.483-4.704.967-1.019 2.406-1.565 4.404-1.565 1.999 0 3.432.546 4.389 1.564Zm15.89 14.27v9.301h-4.106V16.59c0-.406-.042-.771-.144-1.076-.103-.304-.28-.584-.573-.753-.427-.258-1.037-.348-1.74-.348h-.5v11.816h-4.239V1.33h7.446c1.257 0 2.117.29 2.668.785l.003.002c.579.512.987 1.25 1.196 2.258l.001.005c.226 1.035.341 2.269.341 3.705 0 1.378-.178 2.43-.503 3.187l-.002.005c-.289.69-.836 1.183-1.71 1.469l-1.795.586 1.849.379c.69.141 1.116.466 1.361.955l.004.008c.284.543.443 1.284.443 2.256Zm-7.034-6.504v.5h1.751c.276 0 .537-.077.764-.242.221-.16.381-.383.496-.634.224-.49.314-1.161.314-1.964 0-.516-.02-.955-.062-1.313-.041-.347-.108-.66-.226-.897-.263-.526-.762-.747-1.33-.747h-1.707v5.297Zm9.565 9.153v-2.03h4.121v2.737c0 .638.093 1.199.32 1.641l.004.008.004.008c.293.523.8.756 1.393.756.558 0 1.083-.166 1.389-.636.271-.404.362-.98.362-1.63 0-.823-.081-1.537-.256-2.128a4.807 4.807 0 0 0-.913-1.701c-.403-.517-.956-1.104-1.651-1.758v-.001l-2.324-2.206-.001-.001c-1.651-1.558-2.448-3.305-2.448-5.258 0-2.137.494-3.683 1.405-4.716.912-1.025 2.246-1.568 4.084-1.568 2.296 0 3.797.611 4.654 1.706l.002.002c.839 1.062 1.325 2.69 1.386 4.959h-4.262V6.48c0-.454-.135-.87-.459-1.183-.311-.308-.718-.436-1.159-.436-.506 0-.975.147-1.297.533l-.001.001c-.277.336-.394.751-.394 1.202 0 .453.122.918.341 1.388.235.505.675 1.042 1.271 1.608h.001l2.985 2.868.002.002a16.353 16.353 0 0 1 1.599 1.756l.002.003c.463.58.84 1.267 1.128 2.066v.002c.279.763.426 1.721.426 2.89 0 2.378-.442 4.178-1.272 5.45l-.001.001c-.769 1.183-2.135 1.833-4.26 1.833-2.293 0-3.831-.571-4.747-1.598-.921-1.043-1.434-2.769-1.434-5.29Zm24.149 2.605v4.047h-9.698V1.33h9.36v4.004h-5.092v6.047h4.886v3.871h-4.886v6.93h5.43Z"
      stroke="#fff"
    />
    <path
      d="M.176 26.73 2.678.83h8.785l2.458 25.9h-4.9l-.369-4.18h-3.12l-.323 4.18H.176ZM5.9 18.414h2.355L7.122 5.244h-.236L5.9 18.414ZM15.51 26.73V.83h7.888l2.178 15.79L27.739.83H35.7v25.9h-4.738V8.07l-2.973 18.66h-4.65l-3.15-18.66v18.66h-4.68ZM37.996 26.73V.83h7.02c1.883 0 3.252.46 4.105 1.383.864.912 1.295 2.423 1.295 4.532v1.133c0 1.217-.22 2.203-.662 2.958-.431.755-1.094 1.251-1.986 1.486 1.167.295 1.947.986 2.34 2.075.402 1.08.603 2.4.603 3.959 0 1.678-.157 3.144-.471 4.4-.314 1.256-.883 2.232-1.707 2.929-.824.696-1.997 1.044-3.517 1.044h-7.02Zm5.062-16.144h1.06c.48 0 .79-.187.927-.56.137-.372.206-.818.206-1.338V6.083c0-.834-.368-1.251-1.104-1.251h-1.089v5.754Zm.515 11.582c1.344 0 2.017-.638 2.017-1.914v-3.237c0-.736-.113-1.315-.339-1.737-.216-.431-.628-.647-1.236-.647h-.957v7.505c.216.02.388.03.515.03ZM51.711 26.73 54.213.83H63l2.457 25.9h-4.9l-.368-4.18h-3.12l-.324 4.18h-5.033Zm5.725-8.315h2.355L58.657 5.244h-.235l-.986 13.17ZM73.197 26.965c-2.365 0-4.072-.589-5.121-1.766-1.04-1.177-1.56-3.051-1.56-5.622v-2.53h5.12v3.237c0 .598.09 1.07.266 1.413.186.333.505.5.956.5.471 0 .795-.137.972-.412.186-.275.28-.726.28-1.354 0-.795-.08-1.457-.236-1.987a4.325 4.325 0 0 0-.824-1.53c-.383-.49-.918-1.06-1.604-1.707l-2.326-2.208c-1.736-1.638-2.604-3.512-2.604-5.621 0-2.208.51-3.89 1.53-5.048 1.03-1.157 2.517-1.736 4.46-1.736 2.373 0 4.056.633 5.047 1.898 1 1.266 1.5 3.189 1.5 5.769h-5.268V6.48c0-.354-.103-.629-.309-.825-.196-.196-.466-.294-.809-.294-.412 0-.716.117-.912.353-.187.226-.28.52-.28.883s.098.755.294 1.177c.197.422.584.908 1.163 1.457l2.987 2.87a16.829 16.829 0 0 1 1.648 1.81c.5.628.903 1.363 1.207 2.207.304.834.456 1.854.456 3.061 0 2.433-.45 4.341-1.354 5.725-.892 1.373-2.452 2.06-4.68 2.06ZM87.118 26.965c-2.364 0-4.071-.589-5.121-1.766-1.04-1.177-1.56-3.051-1.56-5.622v-2.53h5.121v3.237c0 .598.089 1.07.265 1.413.187.333.505.5.957.5.47 0 .794-.137.97-.412.187-.275.28-.726.28-1.354 0-.795-.078-1.457-.235-1.987a4.325 4.325 0 0 0-.824-1.53c-.383-.49-.917-1.06-1.604-1.707l-2.325-2.208c-1.737-1.638-2.605-3.512-2.605-5.621 0-2.208.51-3.89 1.53-5.048 1.03-1.157 2.517-1.736 4.46-1.736 2.374 0 4.056.633 5.047 1.898 1 1.266 1.501 3.189 1.501 5.769h-5.268V6.48c0-.354-.103-.629-.31-.825-.196-.196-.465-.294-.809-.294-.412 0-.716.117-.912.353-.186.226-.28.52-.28.883s.099.755.295 1.177c.196.422.583.908 1.162 1.457l2.988 2.87a16.829 16.829 0 0 1 1.648 1.81c.5.628.902 1.363 1.206 2.207.305.834.457 1.854.457 3.061 0 2.433-.452 4.341-1.354 5.725-.893 1.373-2.453 2.06-4.68 2.06ZM94.182 26.73 96.684.83h8.785l2.458 25.9h-4.901l-.368-4.18h-3.12l-.323 4.18h-5.033Zm5.724-8.315h2.355l-1.133-13.171h-.236l-.986 13.17ZM109.516 26.73V.83h7.123c1.864 0 3.266.52 4.208 1.56.942 1.03 1.413 2.54 1.413 4.532v12.126c0 2.452-.432 4.346-1.295 5.68-.853 1.334-2.355 2.001-4.503 2.001h-6.946Zm5.209-4.577h.898c.952 0 1.428-.461 1.428-1.384V7.407c0-.863-.118-1.417-.354-1.663-.225-.255-.691-.382-1.398-.382h-.574v16.79ZM125.306 10.189l-1.471-9.36h5.18l-1.119 9.36h-2.59Z"
      fill="#fff"
    />
  </svg>
)

export default SvgComponent
