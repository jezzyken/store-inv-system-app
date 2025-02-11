<template>
  <canvas ref="canvas" class="particle-canvas"></canvas>
</template>

<script>
export default {
  name: 'ParticleBackground',
  data() {
    return {
      canvas: null,
      ctx: null,
      particles: [],
      mouse: {
        x: null,
        y: null,
        radius: 150
      }
    }
  },
  mounted() {
    this.initCanvas()
    this.animate()
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    initCanvas() {
      this.canvas = this.$refs.canvas
      this.ctx = this.canvas.getContext('2d')
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.createParticles()
    },
    handleResize() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.createParticles()
    },
    handleMouseMove(event) {
      this.mouse.x = event.x
      this.mouse.y = event.y
    },
    createParticles() {
      this.particles = []
      const numberOfParticles = (this.canvas.width * this.canvas.height) / 9000
      
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 5 + 1
        const x = Math.random() * this.canvas.width
        const y = Math.random() * this.canvas.height
        const directionX = Math.random() * 2 - 1
        const directionY = Math.random() * 2 - 1
        const color = '#2ecc71'

        this.particles.push({
          x,
          y,
          directionX,
          directionY,
          size,
          color
        })
      }
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      for (let i = 0; i < this.particles.length; i++) {
        const particle = this.particles[i]
        
        // Draw particle
        this.ctx.beginPath()
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        this.ctx.fillStyle = particle.color
        this.ctx.fill()

        // Update position
        particle.x += particle.directionX
        particle.y += particle.directionY

        // Bounce off walls
        if (particle.x > this.canvas.width || particle.x < 0) {
          particle.directionX *= -1
        }
        if (particle.y > this.canvas.height || particle.y < 0) {
          particle.directionY *= -1
        }

        // Mouse interaction
        if (this.mouse.x != null && this.mouse.y != null) {
          const dx = this.mouse.x - particle.x
          const dy = this.mouse.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < this.mouse.radius) {
            const angle = Math.atan2(dy, dx)
            const force = (this.mouse.radius - distance) / this.mouse.radius
            
            particle.x -= Math.cos(angle) * force * 2
            particle.y -= Math.sin(angle) * force * 2
          }
        }

        // Connect nearby particles
        for (let j = i; j < this.particles.length; j++) {
          const particle2 = this.particles[j]
          const dx = particle.x - particle2.x
          const dy = particle.y - particle2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            this.ctx.beginPath()
            this.ctx.strokeStyle = `rgba(46, 204, 113, ${1 - distance/100})`
            this.ctx.lineWidth = 1
            this.ctx.moveTo(particle.x, particle.y)
            this.ctx.lineTo(particle2.x, particle2.y)
            this.ctx.stroke()
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #124829;
  z-index: 0;
}
</style>