<template>
  <main class="edit">
    <div class="loading-container" v-if="saving"></div>

    <article>
      <h1>{{ title }}</h1>
      <div>投稿者: {{ $route.params.username }}</div>
      <div class="">
        <button @click="end" class="text-button">編集終了</button>
      </div>
      <div v-if="errorMessage" class="warn">
        {{ errorMessage }}
      </div>

      <section class="memo-view">
        <editor
          v-model="memo"
          api-key="3hgrfaoyg1561x79u87b56n3jka8u0kf3c098n2afls30p0l"
          :inline="false"
          :init="{
            content_style: '{border:5px solid #000000;  padding: 3px;}',
            height: 800,
            menubar: true,
            //images_upload_url: apiUrl + '/api/uploadimg',
            images_upload_handler: this.imageUploadHandler,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media  table paste code help wordcount',
            ],
            toolbar:
              'image undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
            images_file_types: 'jpg,svg,webp,png',
            paste_data_images: true,
          }"
          placeholder="■ここにメモを追加"
          class="editor"
        />
      </section>

      <form @submit.prevent="save" class="save-form">
        <button
          type="submit"
          class="text-button primary"
          v-bind:disabled="saving"
        >
          保存
        </button>
      </form>
    </article>
  </main>

  <canvas
    :width="canvasWidth"
    :height="canvasHeight"
    id="canvas"
    hidden
  ></canvas>
</template>

<style scoped>
.edit {
  background-color: #eaf5ff;
  padding-top: 20px;
  padding-bottom: 20px;
}

h1 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

img {
  max-width: 100%;
}

article {
  max-width: 800px;
  width: 100%;
  min-height: 100vh;
  margin-top: 20px;
  margin-right: auto;
  margin-left: auto;
}
.memo-view {
  margin-top: 10px;
  width: 100%;
  min-height: 80vh;
  background-color: #fff;
  border: 1px solid #aaaaaa;
}
.editor {
  height: 100%;
}

.save-form {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: right;
  align-items: center;
}
</style>

<script>
// import Header from "@/components/HeaderComponent.vue";

import Editor from "@tinymce/tinymce-vue";

export default {
  name: "MemoEditView",
  components: {
    // Header,
    editor: Editor,
  },
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_URL,
      canvasWidth: 1280,
      canvasHeight: 720,
      maxImageWidth: 1280,
      maxImageHeight: 720,
      category: "",
      h2Id: "",
      h3Id: "",
      title: "",
      memo: "",
      errorMessage: "",
      memoOnload: false,
      saving: false,
      file: {},
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    readFile(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
      });
    },
    loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (e) => {
          console.dir("画像読み込みエラー");
          return reject(e);
        };
        img.src = src;
      });
    },
    async drawImage(image) {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      this.resizeCanvas(image);
      await this.sleep(500);
      ctx.drawImage(image, 0, 0, this.canvasWidth, this.canvasHeight);
    },
    /**
     * 画像横幅か高さが最大値を超えていた場合に
     * 画像の縦横比に合わせ画像を描画するためのキャンバスのサイズを変更する
     * @param {Image} image
     */
    resizeCanvas(image) {
      if (
        !(
          image.width > this.maxImageWidth || image.height > this.maxImageHeight
        )
      ) {
        this.canvasWidth = image.width;
        this.canvasHeight = image.height;
        return;
      }

      const widthScale = image.width / this.maxImageWidth;
      const heightScale = image.height / this.maxImageHeight;
      const scale = widthScale >= heightScale ? widthScale : heightScale;

      this.canvasWidth = Math.floor(image.width / scale);
      this.canvasHeight = Math.floor(image.height / scale);
    },
    sleep(timeMs) {
      return new Promise((resolve) => setTimeout(resolve, timeMs));
    },
    canvasToBlob(canvas, imageType, quality) {
      return new Promise((resolve) => {
        canvas.toBlob(
          function (blob) {
            resolve(blob);
          },
          imageType,
          quality
        );
      });
    },
    async uploadImage(blob) {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append("csrfToken", this.$userData.csrfToken);
        formData.append("memoId", this.$route.params.memoId);
        formData.append("username", this.$route.params.username);
        formData.append("image", blob);

        // const data = {
        //   csrfToken: this.$userData.csrfToken,
        //   memoId:this.$route.params.memoId,
        //   username: this.$route.params.username,
        //   image: blob,
        // }
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        };

        this.$http
          .post("/api/memo/uploadimg", formData, config)
          .then((res) => {
            console.dir("/api/memo/uploadimg @ response");
            console.dir(res);
            resolve(res.data.location);
          })
          .catch((error) => {
            console.dir("/api/memo/uploadimg @ error");

            reject(error);
          });
      });
    },
    imageUploadHandler(blobInfo, progress) {
      const canvas = document.getElementById("canvas");

      return new Promise((resolve, reject) => {
        this.readFile(blobInfo.blob())

          .then((src) => this.loadImage(src))

          .then(async (img) => {
            await this.drawImage(img);
            return this.canvasToBlob(canvas, "image/webp", 0.5);
          })

          .then(async (blob) => {
            console.dir(blob.type);
            if (blob.type !== "image/webp") {
              throw new Error("ブラウザが image/webp に対応していません");
            }
            const location = await this.uploadImage(blob, progress);
            progress(location);
            resolve();
          })

          .catch((error) => {
            this.errorMessage = error.response.data.errorMessage;
            progress("");
            reject();
            return;
          });
      });
    },
    end() {
      const p = this.$route.params;
      this.$router.push({
        name: "memo",
        params: {
          username: p.username,
        },
      });
    },

    load() {
      this.$http
        .get("/api/memo/load", {
          params: {
            memoId: this.$route.params.memoId,
            username: this.$route.params.username,
          },
          withCredentials: true,
        })
        .then((res) => {
          console.dir("/api/memo/load @ response");
          console.dir(res.data);
          this.memo = res.data.memo;
          this.title = res.data.memoTitle;
          this.category = res.data.attribute.category;
          this.h2Id = res.data.attribute.h2;
          this.h3Id = res.data.attribute.h3;
          this.memoOnload = true;
          // Editor.focus();
        })
        .catch((error) => {
          console.dir("/api/memo/load @ error");
          console.dir(error);
          if (error.response) {
            console.dir(error.response.data.errorMessage);
            this.errorMessage = error.response.data.errorMessage;
          } else {
            this.errorMessage = "予期せぬエラーが発生しました";
          }
          this.memoOnload = true;
        });
    },
    save() {
      console.dir("save");
      console.dir(this.memo);
      this.saving = true;
      this.$http
        .post(
          "/api/memo/save",
          {
            csrfToken: this.$userData.csrfToken,
            memoId: this.$route.params.memoId,
            username: this.$route.params.username,
            memo: this.memo,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.dir("/api/memo/save @ response");
          console.dir(res.data);

          this.saving = false;
          alert("投稿しました");
        })
        .catch((error) => {
          console.dir("/api/memo/save @ error");
          console.dir(error);
          if (error.response) {
            console.dir(error.response.data.errorMessage);
            this.errorMessage = error.response.data.errorMessage;
          } else {
            this.errorMessage = "予期せぬエラーが発生しました";
          }
          this.saving = false;
        });
    },
    changeFile(e) {
      this.file = e.target.files[0];
    },
  },
};
</script>
