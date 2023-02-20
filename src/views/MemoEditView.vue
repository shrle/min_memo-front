<template>
  <UserInfo></UserInfo>

  <PickStage v-if="memoOnload" :rule="ruleId" :stage="stageId"></PickStage>
  <div class="edit col-10 col-md-6 mx-auto mb-5">
    <h1 class="h6">{{ title }}</h1>
    <div>投稿者: {{ $route.params.username }}</div>

    <div>{{ errorMessage }}</div>
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
          automatic_uploads: true,
          //images_upload_url: apiUrl + 'api/image_upload',
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'image undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
          images_file_types: 'jpg,svg,webp,png',
          paste_data_images: true,
        }"
      />
      <div class="text-end mt-3">
        <input type="submit" class="btn btn-primary" />
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
      category: "",
      ruleId: "",
      stageId: "",
      title: "",
      memo: "",
      errorMessage: "",
      memoOnload: false,
      file: {},
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    end() {
      const p = this.$route.params;
      this.$router.push({
        name: "memo",
        params: {
          username: p.username,
          rule: p.rule,
          stage: p.stage,
        },
      });
    },
    escapeHtml(string) {
      if (typeof string !== "string") {
        return string;
      }
      return string.replace(/['`"<>]/g, (match) => {
        return {
          "'": "&#x27;",
          "`": "&#x60;",
          '"': "&quot;",
          "<": "&lt;",
          ">": "&gt;",
        }[match];
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
          this.ruleId = res.data.attribute.rule;
          this.stageId = res.data.attribute.stage;
          this.memoOnload = true;
        })
        .catch((error) => {
          console.dir("/api/memo/load @ error");
          console.dir(error);
          console.dir(error.response.data.errorMessage);
          this.errorMessage = error.response.data.errorMessage;
          this.memoOnload = true;
        });
    },
    save() {
      this.$http
        .post(
          "/api/memo/save",
          {
            memoId: this.$route.params.memoId,
            memo: this.memo,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.dir("/api/memo/save @ response");
          console.dir(res.data);

          alert("投稿しました");
        })
        .catch((error) => {
          console.dir("/api/memo/save @ error");
          console.dir(error);
          console.dir(error.response.data.errorMessage);
          this.errorMessage = error.response.data.errorMessage;
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
    image_upload_handler(blobInfo, success) {
      console.dir("image_upload_handler");
      this.$http
        .post(
          "/api/image_upload",
          {
            file: blobInfo.blob(),
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.dir("/api/imageUpload @ response");
          success(res.data);
        })
        .catch((error) => {
          console.dir("/api/imageUpload @ error");
          console.dir(error);
        });
    },
  },
};
</script>
