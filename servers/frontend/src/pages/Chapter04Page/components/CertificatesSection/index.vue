<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter04.certificates.title') }}</h2>
    <p>{{ $t('chapter04.certificates.description') }}</p>

    <!-- Method 1: NFX-Vault -->
    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.certificates.method1.title') }}</h3>
      <p v-html="$t('chapter04.certificates.method1.description')"></p>

      <div :class="styles.subsubsection" v-if="$t('chapter04.certificates.method1.install')">
        <h4>{{ $t('chapter04.certificates.method1.install.title') }}</h4>

        <div :class="styles.nested">
          <h5>{{ $t('chapter04.certificates.method1.install.step1.title') }}</h5>
          <pre><code>{{ $t('chapter04.certificates.method1.install.step1.command') }}</code></pre>
        </div>

        <div :class="styles.nested">
          <h5>{{ $t('chapter04.certificates.method1.install.step2.title') }}</h5>
          <p>{{ $t('chapter04.certificates.method1.install.step2.description') }}</p>
          <pre><code>{{ $t('chapter04.certificates.method1.install.step2.yaml') }}</code></pre>
          <div v-if="$t('chapter04.certificates.method1.install.step2.restart')">
            <p>{{ $t('chapter04.certificates.method1.install.step2.restart.description') }}</p>
            <pre><code>{{ $t('chapter04.certificates.method1.install.step2.restart.command') }}</code></pre>
          </div>
        </div>

        <div :class="styles.nested">
          <h5>{{ $t('chapter04.certificates.method1.install.step3.title') }}</h5>
          <p>{{ $t('chapter04.certificates.method1.install.step3.description') }}</p>
        </div>

        <div :class="styles.nested">
          <h5>{{ $t('chapter04.certificates.method1.install.step4.title') }}</h5>
          <p>{{ $t('chapter04.certificates.method1.install.step4.description') }}</p>
          <pre><code>{{ $t('chapter04.certificates.method1.install.step4.yaml') }}</code></pre>
          <div v-if="$t('chapter04.certificates.method1.install.step4.restart')">
            <p>{{ $t('chapter04.certificates.method1.install.step4.restart.description') }}</p>
            <pre><code>{{ $t('chapter04.certificates.method1.install.step4.restart.command') }}</code></pre>
          </div>
          <div v-if="$t('chapter04.certificates.method1.install.step4.verify')">
            <p><strong>{{ $t('chapter04.certificates.method1.install.step4.verify.title') }}</strong></p>
            <pre><code>{{ $t('chapter04.certificates.method1.install.step4.verify.command') }}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Method 2: Manual -->
    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.certificates.method2.title') }}</h3>
      <p>{{ $t('chapter04.certificates.method2.description') }}</p>

      <div :class="styles.nested">
        <h4>{{ $t('chapter04.certificates.method2.step1.title') }}</h4>
        <pre><code>{{ $t('chapter04.certificates.method2.step1.command') }}</code></pre>
      </div>

      <div :class="styles.nested">
        <h4>{{ $t('chapter04.certificates.method2.step2.title') }}</h4>
        <pre><code>{{ $t('chapter04.certificates.method2.step2.command') }}</code></pre>
      </div>

      <div :class="styles.nested">
        <h4>{{ $t('chapter04.certificates.method2.step3.title') }}</h4>
        <p>{{ $t('chapter04.certificates.method2.step3.description') }}</p>
        <pre><code>{{ $t('chapter04.certificates.method2.step3.yaml') }}</code></pre>
      </div>

      <div :class="styles.nested">
        <h4>{{ $t('chapter04.certificates.method2.step4.title') }}</h4>
        <pre><code>{{ $t('chapter04.certificates.method2.step4.command') }}</code></pre>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

