<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter02.bash.title') }}</h2>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter02.bash.problem.title') }}</h3>
      <p>{{ $t('chapter02.bash.problem.description') }}</p>
      <p>{{ $t('chapter02.bash.problem.nasShell') }}</p>
      <ul>
        <li v-for="(need, index) in $tm('chapter02.bash.problem.needs')" :key="index">
          {{ need }}
        </li>
      </ul>
      <p>{{ $t('chapter02.bash.problem.conclusion') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter02.bash.solution.title') }}</h3>
      <p>{{ $t('chapter02.bash.solution.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter02.bash.steps.title') }}</h3>

      <div :class="styles.step">
        <h4>{{ $t('chapter02.bash.steps.step1.title') }}</h4>
        <p>{{ $t('chapter02.bash.steps.step1.description') }}</p>
        <p>{{ $t('chapter02.bash.steps.step1.windows') }}</p>
        <p>{{ $t('chapter02.bash.steps.step1.linuxMac') }}</p>
        <p>{{ $t('chapter02.bash.steps.step1.connect') }}</p>
        <pre><code>{{ $t('chapter02.bash.steps.step1.command') }}</code></pre>
        <p>{{ $t('chapter02.bash.steps.step1.example') }}</p>
        <pre><code>{{ $t('chapter02.bash.steps.step1.exampleCommand') }}</code></pre>
      </div>

      <div :class="styles.step">
        <h4>{{ $t('chapter02.bash.steps.step2.title') }}</h4>
        <p>{{ $t('chapter02.bash.steps.step2.description') }}</p>
        <pre><code>{{ $t('chapter02.bash.steps.step2.command') }}</code></pre>
        <p v-html="$t('chapter02.bash.steps.step2.expected')"></p>
        <pre><code>{{ $t('chapter02.bash.steps.step2.output') }}</code></pre>
        <p>{{ $t('chapter02.bash.steps.step2.note') }}</p>
      </div>

      <div :class="styles.step">
        <h4>{{ $t('chapter02.bash.steps.step3.title') }}</h4>
        <p>{{ $t('chapter02.bash.steps.step3.description') }}</p>
        <pre><code>{{ $t('chapter02.bash.steps.step3.command') }}</code></pre>
        <p>{{ $t('chapter02.bash.steps.step3.note') }}</p>
      </div>

      <div :class="styles.step">
        <h4>{{ $t('chapter02.bash.steps.step4.title') }}</h4>
        <p>{{ $t('chapter02.bash.steps.step4.description') }}</p>
        <pre><code>{{ $t('chapter02.bash.steps.step4.command') }}</code></pre>
        <p>{{ $t('chapter02.bash.steps.step4.note') }}</p>
      </div>

      <div :class="styles.step">
        <h4>{{ $t('chapter02.bash.steps.step5.title') }}</h4>
        <p>{{ $t('chapter02.bash.steps.step5.description') }}</p>
        <pre><code>{{ $t('chapter02.bash.steps.step5.command') }}</code></pre>
        <p v-html="$t('chapter02.bash.steps.step5.expected')"></p>
        <pre><code>{{ $t('chapter02.bash.steps.step5.output') }}</code></pre>
      </div>

      <div :class="styles.step">
        <h4>{{ $t('chapter02.bash.steps.step6.title') }}</h4>
        <p>{{ $t('chapter02.bash.steps.step6.description') }}</p>
        <pre><code>{{ $t('chapter02.bash.steps.step6.command') }}</code></pre>
        <p>{{ $t('chapter02.bash.steps.step6.note') }}</p>
        <p v-html="$t('chapter02.bash.steps.step6.verify')"></p>
        <pre><code>{{ $t('chapter02.bash.steps.step6.verifyCommand') }}</code></pre>
        <p>{{ $t('chapter02.bash.steps.step6.expectedOutput') }}</p>
      </div>

      <div :class="styles.step">
        <h4>{{ $t('chapter02.bash.steps.step7.title') }}</h4>
        <p>{{ $t('chapter02.bash.steps.step7.description') }}</p>
        <pre><code>{{ $t('chapter02.bash.steps.step7.command') }}</code></pre>
        <p>{{ $t('chapter02.bash.steps.step7.note') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

