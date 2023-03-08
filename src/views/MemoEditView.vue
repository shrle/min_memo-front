<template>
  <UserInfo></UserInfo>

  <PickStage v-if="memoOnload" :h2="h2Id" :h3="h3Id"></PickStage>
  <div class="edit col-10 col-md-6 mx-auto mb-5">
    <h1 class="h6">{{ title }}</h1>
    <div>投稿者: {{ $route.params.username }}</div>

    <div v-if="errorMessage" class="alert alert-warning" role="alert">
      {{ errorMessage }}
    </div>
    <div class="mt-2 mb-5">
      <button @click="end" class="btn btn-secondary">編集終了</button>
    </div>

    <form @submit.prevent="save">
      <editor
        v-model="memo"
        api-key="3hgrfaoyg1561x79u87b56n3jka8u0kf3c098n2afls30p0l"
        :init="{
          height: 500,
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
      />
      <canvas
        :width="canvasWidth"
        :height="canvasHeight"
        id="canvas"
        hidden
      ></canvas>
      <div class="text-end mt-3">
        <input type="submit" class="btn btn-primary" v-bind:disabled="saving" />
      </div>
      <div v-if="saving" class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </form>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";
import PickStage from "@/components/PickStage.vue";
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "MemoEditView",
  components: {
    UserInfo,
    PickStage,
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
        formData.append("image", blob);
        formData.append("username", this.$route.params.username);

        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        };

        this.$http
          .post("/api/uploadimg", formData, config)
          .then((res) => {
            console.dir("/api/uploadimg @ response");
            console.dir(res);
            resolve(res.data.location);
          })
          .catch((error) => {
            console.dir("/api/uploadimg @ error");
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

          .catch((e) => {
            console.dir(e);
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
    upload() {
      console.dir("upload");
      console.dir(this.file);
      const formData = new FormData();
      formData.append("file", this.file);

      console.dir(formData);
      this.$http
        .post(
          "/api/image_upload",
          {
            formData,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.dir("/api/imageUpload @ response");
          console.dir(res);
        })
        .catch((error) => {
          console.dir("/api/imageUpload @ error");
          console.dir(error);
        });
    },
  },
};
</script>
